import 'fabric';
declare const fabric: any;

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Artboard } from '../models/artboard';

@Injectable()
export class CanvasService {

  artboards: Artboard[] = []
  activeArtboard: Artboard;

  constructor(
    public electron: ElectronService,
  ) {

    // add empty default artboard (or example when developing)
    if (this.artboards.length < 1) {
      if (electron.isDev())

        this.artboards.push(new Artboard("firstexample",
          {"objects":[{"type":"circle","originX":"center","originY":"center","left":400,"top":400,"width":150,"height":150,"fill":"green","overlayFill":null,"stroke":"rgba(255,0,0,0.6)","strokeWidth":15,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"radius":75},{"type":"rect","originX":"center","originY":"center","left":100,"top":100,"width":125,"height":125,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":"red","strokeWidth":1,"strokeDashArray":[5,5],"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0,"name":"layout"},{"type":"text","originX":"center","originY":"center","left":250,"top":250,"width":103.46,"height":52,"fill":"rgb(0,0,0)","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"text":"DATA","fontSize":40,"fontWeight":"normal","fontFamily":"TimesNewRoman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"backgroundColor":"","textBackgroundColor":"","useNative":true,"name":"hi"}],"background":""}
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

  selectSquare() {
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    this.getActive().object.add(rect);
  }

}
