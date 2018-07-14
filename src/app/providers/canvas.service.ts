import { Injectable, ElementRef } from '@angular/core';


@Injectable()
export class CanvasService {

  activeArtboard: any; // type is fabric.Canvas

  constructor() {
    
  }

  setActive(fabricCanvas: any) {
    this.activeArtboard = fabricCanvas;
  }

  // Menubar

  save() {
    var json = this.activeArtboard.toJSON();
    console.log("saved", json);
  }

  // Toolbox

}
