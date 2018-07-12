import { Component, OnInit } from '@angular/core';

import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  canvas: any;

  constructor() { }

  ngOnInit() {
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = new fabric.Canvas('canvas', { selection: false });

    let red = new fabric.Rect({
      top: 100, left: 0, width: 80, height: 50, fill: 'red' });
    let blue = new fabric.Rect({
      top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
    let green = new fabric.Rect({
      top: 100, left: 100, width: 60, height: 60, fill: 'green' });

    fabric.Object.prototype.transparentCorners = false;

    this.canvas.add(red, blue, green)

  }

}
