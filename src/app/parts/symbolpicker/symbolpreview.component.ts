import 'fabric';
declare const fabric: any;

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: "app-symbolpreview",
  template: `

    <canvas width="200" height="200" #element></canvas>

  `,
  styles: [`
  `],
})
export class SymbolpreviewComponent implements OnInit {

  @Input() data: any;
  @ViewChild('element') element: ElementRef;

  constructor() {}

  ngOnInit() {
    let canvas = new fabric.StaticCanvas(this.element.nativeElement, {
      renderOnAddRemove: false
    });
    // TODO: transform symbols so they are centered and contained
    canvas.loadFromJSON(this.data, () => {
      canvas.renderAll();
    });

    // canvas doesnt scale with css
    this.element.nativeElement.style.height = "50px";
    this.element.nativeElement.style.width = "50px";
  }

}
