import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanvasService } from '../../../providers/canvas.service';
import { UIService } from '../../../providers/ui.service';

@Component({
  selector: 'app-appearance-panel',
  templateUrl: './appearance-panel.component.html',
  styleUrls: ['./appearance-panel.component.scss']
})
export class AppearancePanelComponent implements OnInit {

  form: FormGroup;

  formatterPixels = value => `${value}px`;
  parserPixels = value => value.replace('px', '');
  
  formatterPercent = value => `${Math.round(value*100)}%`;
  formatterDegrees = value => `${value}°`;

  opacitymarks: any = { 0: "0%", 1: "100%" };
  rotationmarks: any = { 0: "0", 90: "90", 180: "180", 270: "270", 360: "306" };

  constructor(
    public fb: FormBuilder,
    public canvas: CanvasService,
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.ui.appearancePanel = this;

    this.form = this.fb.group({
      top: "",
      left: "",
      width: "",
      height: "",
      opacity: 0,
      angle: 0,
    });

    // subscribe to each control and send changes
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).valueChanges.subscribe((val) => {
        this.canvas.setProperty(key,val);
      });
    });

    // TODO: Add lock aspect ration button for width & height
    // TODO: Add aligning on artboard buttons
    // TODO: Fix scaling vs width/height
    // TODO: Add option to change default anchorpoint
    // TODO: Add stroke width option
  }

  mirrorProperties(object: any) {
    
    if (object)
      Object.keys(this.form.controls).forEach(key => {
        if (object[key])
          this.form.get(key).setValue(Math.round(object[key] * 100) / 100, {emitEvent: false});
        else
          this.form.get(key).reset("", {emitEvent: false});
      });
    else
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).reset("", {emitEvent: false});
      });
  }

}
