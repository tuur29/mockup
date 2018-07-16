import 'fabric';
declare const fabric: any;

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Artboard } from '../models/artboard';
import { LocalStorage } from 'ngx-store';
import { exportCanvas, saveCanvas } from '../helpers/save.helper';
import { EventEmitter } from '@angular/core';

@Injectable()
export class CanvasService {

  artboards: Artboard[] = []
  activeArtboard: Artboard;

  @LocalStorage() strokeColor: string = "#000000";
  @LocalStorage() fillColor: string = "#ffffff";

  defaultObjectPropeties = {};

  previousStates: any[][] = [];
  futureStates: any[][] = [];
  stateEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  lastSaveStamp: number;

  _clipboard: any;
  maxHistorySize: number = 50;

  loadedArtboardsCount = 0;

  constructor(
    public electron: ElectronService,
  ) {

    // add empty default artboard (or example when developing)
    if (this.artboards.length < 1) {
      if (electron.isDev())

        this.artboards.push(new Artboard("firstexample", "First Example",
          {"objects":[{"type":"circle","originX":"center","originY":"center","left":400,"top":400,"width":150,"height":150,"fill":"green","overlayFill":null,"stroke":"rgba(255,0,0,0.6)","strokeWidth":15,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"radius":75},{"type":"rect","originX":"center","originY":"center","left":100,"top":100,"width":125,"height":125,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":"red","strokeWidth":1,"strokeDashArray":[5,5],"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0,"name":"layout"},{"type":"i-text","version":"2.3.3","originX":"left","originY":"top","left":48,"top":182,"width":70.51,"height":45.2,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Text","fontSize":40,"fontWeight":"normal","fontFamily":"Segoe UI","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}],"background":""}
        ));

      else
        this.newArtboard();
    }
    
  }

  setActive(artboard: Artboard) {
    this.activeArtboard = artboard;
  }

  getActive(): Artboard {
    return this.activeArtboard || this.artboards[0];
  }

  markLoaded(artboard: Artboard) {
    this.loadedArtboardsCount++;

    // save first state if all artboards were loaded
    if (this.loadedArtboardsCount == this.artboards.length) {
      this.saveState();
    }
  }

  selectById(artboardId: string, index: number) {
    let artboard = this.artboards.find((a) => a.id==artboardId).object;
    artboard.setActiveObject(artboard.item(index));
  }

  // Menubar

  newArtboard() {
    this.artboards.push(new Artboard());
  }

  save(path: string) {
    saveCanvas(this.artboards, path);
  }

  export(path:string, type: string) {
    exportCanvas(this.artboards, path, type);
  }

  // Toolbox

  // TODO: Add drawing shapes instead of spawning them

  selectPointer() {

  }

  selectAddSelection() {

  }

  selectRemoveSelection() {

  }

  selectPicker() {

  }

  selectSquare() {
    var rect = new fabric.Rect(Object.assign(this.defaultObjectPropeties, {
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 3
    }));
    this.getActive().object.add(rect);
    this.saveState();
  }

  selectCircle() {
    var circle = new fabric.Circle(Object.assign(this.defaultObjectPropeties, {
      left: 100,
      top: 100,
      radius: 50,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 3
    }));
    this.getActive().object.add(circle);
    this.saveState();
  }

  selectLine() {
    var line = new fabric.Line([100,100,200,200], Object.assign(this.defaultObjectPropeties, {
      stroke: this.strokeColor,
      strokeWidth: 3
    }));
    this.getActive().object.add(line);
    this.saveState();
  }

  selectArrow() {
    // TODO: implement arrow tool https://blog.thirdrocktechkno.com/how-to-draw-an-arrow-using-html-5-canvas-and-fabricjs-9500c3f50ecb
  }

  selectPath() {
    // TODO: implement path tool
  }

  selectText() {
    var line = new fabric.IText("Text", Object.assign(this.defaultObjectPropeties, {
      left: 100,
      top: 100,
      fill: "#000000",
      stroke: null
    }));
    this.getActive().object.add(line);
    this.saveState();
  }

  selectArtboard() {
    // TODO: implement artboard tool
  }

  addSymbol(symbol: any) {
    let temp = new fabric.Canvas();
    temp.loadFromJSON(symbol);
    let group = new fabric.Group(temp.getObjects(), Object.assign(this.defaultObjectPropeties, { left: 100, top: 100 }));
    this.getActive().object.add(group);
    this.saveState();
  }

  updateStrokeColor(value: string) {
    this.strokeColor = value;
    if (this.getActive().object) {
      this.getActive().object.getActiveObjects().forEach(obj => obj.set('stroke', value));
      this.getActive().object.requestRenderAll();
      this.saveState();
    }
  }

  updateFillColor(value: string) {
    this.fillColor = value;
    if (this.getActive().object) {
      this.getActive().object.getActiveObjects().forEach(obj => obj.setColor(value));
      this.getActive().object.requestRenderAll();
      this.saveState();
    }
  }

  // menubar

  // method: 0 -> normal saveState to previous, 1 -> save state to previous while keeping future, 2 -> push to future
  saveState(method: number = 0) {

    // TODO: Group similar edits instead of limiting based on time
    // limit states for when gradually changing something like position or opacity
    let now = Date.now();
    if (now - this.lastSaveStamp < 200)
      return;
    this.lastSaveStamp = now;

    let state: any[] = this.artboards.map(artboard =>
      artboard.toJSON()
    );
    this.stateEvent.emit(state);
    if (method > 1) {
      this.futureStates.push(state);
      if (this.futureStates.length > this.maxHistorySize)
        this.futureStates.splice(0,1);
    } else {
      this.previousStates.push(state);
      if (this.previousStates.length > this.maxHistorySize)
        this.previousStates.splice(0,1);
      if (method < 1)
        this.futureStates = [];
    }
  }

  // TODO: Reselect correct artboard and object after undo / redo
  // TODO: Improve performance by only saving / restoring edited states on undo/redo
  // TODO: Fix bug: state goes back to beginning when redoing an undo?
  undo() {
    // first state is current state (for layers panel)
    if (this.futureStates.length < 1)
      this.previousStates.pop();
    let state = this.previousStates.pop();
    if (!state) return;
    this.saveState(2);
    this.artboards = [];
    this.activeArtboard = null;
    state.forEach(newArtboard => {
      this.artboards.push(Artboard.fromJSON(newArtboard));
    });
  }

  redo() {
    let state = this.futureStates.pop();
    if (!state) return;
    this.saveState(1);
    this.artboards = [];
    this.activeArtboard = null;
    state.forEach(newArtboard => {
      this.artboards.push(Artboard.fromJSON(newArtboard));
    });
  }

  copy(deleteAfter: boolean = false): any {
    this.getActive().object.getActiveObject().clone((cloned) => {
      this._clipboard = cloned;
      if (deleteAfter)
        this.deleteSelection();
    });
  }

  paste() {
    this._clipboard.clone((clonedObj) => {
      this.getActive().object.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas = this.getActive().object;
        clonedObj.forEachObject((obj) => {
          this.getActive().object.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        this.getActive().object.add(clonedObj);
      }
      this._clipboard.top += 10;
      this._clipboard.left += 10;
      this.getActive().object.setActiveObject(clonedObj);
      this.getActive().object.requestRenderAll();
    });
    this.saveState();
  }

  groupSelection() {
    if (!this.getActive())
      return;
    if (!this.getActive().object.getActiveObject())
      return;
    if (this.getActive().object.getActiveObject().type !== 'activeSelection')
      return;

    this.getActive().object.getActiveObject().toGroup();
    this.getActive().object.requestRenderAll();
    this.saveState();
  }

  unGroupSelection() {
    if (!this.getActive())
      return;
    if (!this.getActive().object.getActiveObject())
      return;
    if (this.getActive().object.getActiveObject().type !== 'group')
      return;

    this.getActive().object.getActiveObject().toActiveSelection();
    this.getActive().object.requestRenderAll();
    this.saveState();
  }

  bringToFront() {
    this.getActive().object.getActiveObjects().forEach(obj => {
      this.getActive().object.bringToFront(obj);
    });
  }
  bringForward() {
    this.getActive().object.getActiveObjects().forEach(obj => {
      this.getActive().object.bringForward(obj);
    });
  }
  sendBackwards() {
    this.getActive().object.getActiveObjects().forEach(obj => {
      this.getActive().object.sendBackwards(obj);
    });
  }
  sendToBack() {
    this.getActive().object.getActiveObjects().forEach(obj => {
      this.getActive().object.sendToBack(obj);
    });
  }

  deleteSelection() {
    // TODO: Fix remove selection
    if (!this.getActive())
      return;
    if (!this.getActive().object.getActiveObject())
      return;
  
    this.getActive().object.getActiveObjects(o => {
      this.getActive().object.remove(o);
    });
    this.getActive().object.requestRenderAll();
    this.saveState();
  }

  // panels

  // appearance

  setProperty(prop: string, value: any) {

    let objects = this.getActive().object.getActiveObjects();
    objects.forEach(obj => {
      let option = {};
      option[prop] = value;
      obj.set(option);
      
      this.getActive().object.requestRenderAll();
    });
    this.saveState();

  }

}
