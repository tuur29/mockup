import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})
export class ColorpickerComponent implements OnInit {

  // color
  private _colorValue: string;
  get colorValue() { return this._colorValue; }
  @Output() colorValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() set colorValue(value: string) {
    this._colorValue = value;
    this.colorValueChange.emit(value);
  }

  // presets
  private _colorPresets: string[] = [];
  get colorPresets() { return this._colorPresets; }
  @Output() colorPresetsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() set colorPresets(value: string[]) {
    this._colorPresets = value;
    this.colorPresetsChange.emit(value);
  }

  constructor() { }

  ngOnInit() {
  }

  // TODO: Fix adding presets
  AddPresetColor(presets: string[]) {
    this.colorPresets = presets;
  }

}
