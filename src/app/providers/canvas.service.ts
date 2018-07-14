import 'fabric';
declare const fabric: any;

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Artboard } from '../models/artboard';
import { LocalStorage } from 'ngx-store';
import { exportCanvas, saveCanvas } from '../helpers/save.helper';

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

        this.artboards.push(new Artboard("firstexample", "First Example",
          {"objects":[{"type":"circle","originX":"center","originY":"center","left":400,"top":400,"width":150,"height":150,"fill":"green","overlayFill":null,"stroke":"rgba(255,0,0,0.6)","strokeWidth":15,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"radius":75},{"type":"rect","originX":"center","originY":"center","left":100,"top":100,"width":125,"height":125,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":"red","strokeWidth":1,"strokeDashArray":[5,5],"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0,"name":"layout"},{"type":"i-text","version":"2.3.3","originX":"left","originY":"top","left":48,"top":182,"width":70.51,"height":45.2,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Text","fontSize":40,"fontWeight":"normal","fontFamily":"TimesNewRoman","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}],"background":""}
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

  // panels

  // appearance

  setProperty(prop: string, value: number) {
    let objects = this.getActive().object.getActiveObjects();

    objects.forEach(obj => {
      switch (prop) {
        case "top": {
          obj.set({left: value});
          break;
        }
        case "left": {
          obj.set({top: value});
          break;
        }
        case "width": {
          obj.set({width: value});
          break;
        }
        case "height": {
          obj.set({height: value});
          break;
        }
        case "opacity": {
          obj.opacity = value;
          break;
        }
        case "angle": {
          obj.rotate(value);
          break;
        }
      }
      this.getActive().object.renderAll();
    });

  }

}
