import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { CanvasService } from '../../../providers/canvas.service';


@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

  // TODO: link toolbox items to keyboard shortcuts

  // collapse toolbox together with layout in home component
  private _collapsed: boolean;
  get collapsed() { return this._collapsed; }
  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() set collapsed(value: boolean) {
    this._collapsed = value;
    this.collapsedChange.emit(value);
  }

  lastColorPicked: string = "fore";
  @LocalStorage() presets: string[] = ["#ffa39e","#ff4d4f","#cf1322","#820014","#ffbb96","#ff7a45","#d4380d","#871400","#ffd591","#ffa940","#d46b08","#873800","#ffe58f","#ffc53d","#d48806","#874d00","#fffb8f","#ffec3d","#d4b106","#876800","#eaff8f","#bae637","#7cb305","#3f6600","#b7eb8f","#73d13d","#389e0d","#135200","#87e8de","#36cfc9","#08979c","#00474f","#91d5ff","#40a9ff","#096dd9","#003a8c","#adc6ff","#597ef7","#1d39c4","#061178","#d3adf7","#9254de","#531dab","#22075e","#ffadd2","#f759ab","#c41d7f","#780650","#ffffff","#cccccc","#333333","#000000"];

  constructor(
    public canvas: CanvasService,
  ) { }

  ngOnInit() {
  }

  // TODO Add button to switch colors around

}
