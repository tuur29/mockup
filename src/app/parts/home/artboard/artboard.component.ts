import 'fabric';
declare const fabric: any;

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { UIService } from '../../../providers/ui.service';
import { Artboard } from '../../../models/artboard';

@Component({
  selector: 'app-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent implements OnInit {

  private _artboardModel: Artboard;
  get artboardModel() { return this._artboardModel; }
  @Output() artboardModelChange: EventEmitter<Artboard> = new EventEmitter<Artboard>();
  @Input() set artboardModel(value: Artboard) {
    this._artboardModel = value;
    this.artboardModelChange.emit(value);
  }

  @ViewChild('element') element;

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.setupCanvas();
  }

  setupCanvas() {
    this.artboardModel.object = new fabric.Canvas(this.element.nativeElement);

    if (this.artboardModel.data) {
      this.loadCanvasFromData(this.artboardModel.data);
      this.artboardModel.data = null;
    }
  }

  loadCanvasFromData(data: any) {
    this.artboardModel.object.loadFromJSON(data, obj => {
      this.artboardModel.object.renderAll();
    });
  }

}
