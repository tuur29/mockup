import 'fabric';
declare const fabric: any;

import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { UIService } from '../../../providers/ui.service';
import { Artboard } from '../../../models/artboard';

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
  ) { }

  ngOnInit() {
    this.setupCanvas();
    this.registerEvents();
  }

  setupCanvas() {
    this.artboard.object = new fabric.Canvas(this.element.nativeElement);

    if (this.artboard.data) {
      this.loadCanvasFromData(this.artboard.data);
      this.artboard.data = null;
    }
  }

  loadCanvasFromData(data: any) {
    this.artboard.object.loadFromJSON(data, obj => {
      this.artboard.object.renderAll();
    });
  }

  registerEvents() {

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
