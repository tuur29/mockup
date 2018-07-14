import 'fabric';
declare const fabric: any;

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Artboard } from '../models/artboard';
import { LocalStorage } from 'ngx-store';

@Injectable()
export class CanvasService {

  artboards: Artboard[] = []
  activeArtboard: Artboard;

  @LocalStorage() strokeColor: string = "#000000";
  @LocalStorage() fillColor: string = "#ffffff";

  constructor(
    public electron: ElectronService,
  ) {

    // add empty default artboard (or example when developing)
    if (this.artboards.length < 1) {
      if (electron.isDev())

        this.artboards.push(new Artboard("firstexample",
          {"objects":[{"type":"circle","originX":"center","originY":"center","left":400,"top":400,"width":150,"height":150,"fill":"green","overlayFill":null,"stroke":"rgba(255,0,0,0.6)","strokeWidth":15,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"radius":75},{"type":"rect","originX":"center","originY":"center","left":100,"top":100,"width":125,"height":125,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":"red","strokeWidth":1,"strokeDashArray":[5,5],"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0,"name":"layout"},{"type":"text","originX":"center","originY":"center","left":250,"top":250,"width":103.46,"height":52,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"text":"DATA","fontSize":40,"fontWeight":"normal","fontFamily":"TimesNewRoman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"strokeColor":"","textstrokeColor":"","useNative":true,"name":"hi"}],"background":""}
        ));

      else
        this.newArtboard();
    }
    
  }

  setActive(fabricCanvas: any) {
    this.activeArtboard = fabricCanvas;
  }

  getActive() {
    return this.activeArtboard || this.artboards[0];
  }

  // Menubar

  newArtboard() {
    this.artboards.push(new Artboard());
  }

  save() {
    let json = this.artboards.map(artboard => artboard.toJSON());
    console.log("saved", json);
  }

  // Toolbox

  // TODO: Add drawing shapes instead of spawning them

  selectPointer() {

  }

  selectAddSelection() {

  }

  selectoRemoveSelection() {

  }

  selectPicker() {

  }

  selectSquare() {
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 3
    });
    this.getActive().object.add(rect);
  }

  selectCircle() {
    var circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: 3
    });
    this.getActive().object.add(circle);
  }

  selectLine() {
    var line = new fabric.Line([100,100,200,200], {
      stroke: this.strokeColor,
      strokeWidth: 3
    });
    this.getActive().object.add(line);
  }

  selectArrow() {
    // TODO: implement arrow tool https://blog.thirdrocktechkno.com/how-to-draw-an-arrow-using-html-5-canvas-and-fabricjs-9500c3f50ecb
  }

  selectPath() {
    // TODO: implement path tool
  }

  selectText() {
    var line = new fabric.IText("Text", {
      left: 100,
      top: 100,
      fill: this.strokeColor
    });
    this.getActive().object.add(line);
  }

  selectArtboard() {
    // TODO: implement artboard tool
  }

  addSymbol(symbol: any) {
    let temp = new fabric.Canvas();
    temp.loadFromJSON(symbol);
    let group = new fabric.Group(temp.getObjects(), { left: 100, top: 100 });
    this.getActive().object.add(group);
  }

}
