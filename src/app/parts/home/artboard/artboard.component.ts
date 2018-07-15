import 'fabric';
declare const fabric: any;

import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { UIService } from '../../../providers/ui.service';
import { Artboard } from '../../../models/artboard';
import { CanvasService } from '../../../providers/canvas.service';

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent implements OnInit {

  private _artboard: Artboard;
  get artboard() { return this._artboard; }
  @Output() artboardChange: EventEmitter<Artboard> = new EventEmitter<Artboard>();
  @Input() set artboard(value: Artboard) {
    this._artboard = value;
    this.artboardChange.emit(value);
  }

  @ViewChild('element') element: ElementRef;

  constructor(
    public ui: UIService,
    public canvas: CanvasService,
  ) { }

  ngOnInit() {
    this.setupCanvas();
    this.registerEvents();
  }

  setupCanvas() {
    this.artboard.object = new fabric.Canvas(this.element.nativeElement, {
      centeredScaling: false,
      // TODO: change uniScaleTransform to false when shift is pressed
      uniScaleTransform: true,
      preserveObjectStacking: true
    });


    if (this.artboard.data) {
      this.loadCanvasFromData(this.artboard.data);
      this.artboard.data = null;
    }

    this.canvas.markLoaded(this.artboard);
  }

  loadCanvasFromData(data: any) {
    this.artboard.object.loadFromJSON(data, obj => {
      this.artboard.object.renderAll();
    });
  }

  registerEvents() {

    // http://fabricjs.com/events

    // change styling of handles
    this.artboard.object.on('selection:created', (e) => {
      e.target.borderColor = 'rgba(0,0,0,0.5)';
      e.target.cornerColor = 'rgba(0,0,0,0.9)';
      e.target.cornerSize = 10;
      e.target.transparentCorners = true;
    });
    this.artboard.object.on('selection:updated', (e) => {
      e.target.borderColor = 'rgba(0,0,0,0.5)';
      e.target.cornerColor = 'rgba(0,0,0,0.9)';
      e.target.cornerSize = 10;
      e.target.transparentCorners = true;
    });

    // automatically select object when added
    this.artboard.object.on('object:added', (event) =>  {
      this.artboard.object.setActiveObject(event.target);
    });

    // toggle text panel depending if a text element is selected
    this.artboard.object.on('selection:created', (event) =>  {
      this.ui.setTextPanelEnabled(
        event.target.type.indexOf("text") > -1
      );
    });
    this.artboard.object.on('selection:updated', (event) =>  {
      this.ui.setTextPanelEnabled(
        this.artboard.object.getActiveObjects().some(element => element.type.indexOf("text") > -1)
      );
    });
    this.artboard.object.on('selection:cleared', (event) =>  {
      this.ui.setTextPanelEnabled(false);
    });

    // update appearancepanel when editing canvas
    this.artboard.object.on('selection:created', (event) =>  {
      this.ui.mirrorProperties(event.target);
    });
    this.artboard.object.on('selection:cleared', (event) =>  {
      this.ui.maskProperties();
    });
    this.artboard.object.on('object:modified', (event) =>  {
      this.mirrorPropertiesMaybeMultiple(event);
    });
    this.artboard.object.on('object:moving', (event) =>  {
      this.mirrorPropertiesMaybeMultiple(event);
    });
    this.artboard.object.on('selection:updated', (event) =>  {
      this.mirrorPropertiesMaybeMultiple(event);
    });

    // update stroke and fill in toolbar
    // TODO fix setting both fill and stroke when selecting text
    this.artboard.object.on('selection:created', (event) =>  {
      this.canvas.strokeColor = event.target.stroke;
      this.canvas.fillColor = event.target.fill;
    });

    this.artboard.object.on('selection:updated', (event) =>  {
      let length = this.artboard.object.getActiveObjects().length;
      if (length < 2) {
        this.canvas.strokeColor = event.target.stroke;
        this.canvas.fillColor = event.target.fill;
      }
    });

  }

  private mirrorPropertiesMaybeMultiple(event) {
    let length = this.artboard.object.getActiveObjects().length;
    if (length > 1) {
      this.ui.maskProperties();
    } else {
      this.ui.mirrorProperties(event.target);
    }
  }

}
