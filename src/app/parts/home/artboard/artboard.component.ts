import { Component, OnInit, Input, ViewChild } from '@angular/core';

import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent implements OnInit {

  @Input() data: any;
  @ViewChild('element') element;
  artboard: any; // type is fabric.Canvas

  constructor() { }

  ngOnInit() {
    this.setupCanvas();
    if (this.data)
      this.loadCanvasFromData();
  }

  setupCanvas() {
    this.artboard = new fabric.Canvas(this.element.nativeElement, { selection: false });
  }

  loadCanvasFromData() {
    this.artboard.loadFromJSON(JSON.parse(this.data), obj => {
      this.artboard.renderAll();
    });
  }

}
