import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanvasService } from '../../../providers/canvas.service';
import { UIService } from '../../../providers/ui.service';

@Component({
  selector: 'app-text-panel',
  templateUrl: './text-panel.component.html',
  styleUrls: ['./text-panel.component.scss']
})
export class TextPanelComponent implements OnInit {

  form: FormGroup;

  // TODO: dynamically load fonts?
  fonts: string[] = ["Segoe UI", "Arial", "Times New Roman", "Helvetica", "Papyrus"];
  filteredFonts: string[];

  formatterPoints = value => `${value}pt`;
  parserPoints = value => value.replace('pt', '');

  formatterLine = value => `${value}em`;
  parserLine = value => value.replace('em', '');

  formatterChar = value => `${value/100}`;

  constructor(
    public fb: FormBuilder,
    public canvas: CanvasService,
    public ui: UIService,
  ) { }

  ngOnInit() {

    this.ui.textPanel = this;

    this.form = this.fb.group({
      fontFamily: "",
      fontSize: "",
      textAlign: "",
      underline: "",
      bold: "",
      italic: "",
      weight: "",
      lineHeight: "",
      charSpacing: "",
    });

    // setup font autocomplete
    this.form.get('fontFamily').valueChanges.subscribe( query => {
      this.filteredFonts = this.fonts.filter(f => f.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });

    // subscribe to each control and send changes
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).valueChanges.subscribe((val) => {

        let keyCopy;
        let valCopy;

        if (key == "bold") {
          keyCopy = "fontWeight";
          valCopy = val ? "bold" : "normal";
        } else if (key == "italic") {
          keyCopy = "fontStyle";
          valCopy = val ? "italic" : "normal";
        } else {
          keyCopy = key;
          valCopy = val;
        }

        this.canvas.setProperty(keyCopy, valCopy);
      });
    });

  }

  // TODO: Fix mirror of fontfamily and alignment properties

  mirrorProperties(object: any) {

    if (object)
      Object.keys(this.form.controls).forEach(key => {
        if (object[key])
          this.form.get(key).setValue(object[key], {emitEvent: false});
        else
          this.form.get(key).reset("", {emitEvent: false});
      });
    else
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).reset("", {emitEvent: false});
      });
  }

}
