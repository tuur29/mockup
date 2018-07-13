import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-symbolpicker",
  templateUrl: "./symbolpicker.component.html",
  styleUrls: ["./symbolpicker.component.scss"],
})
export class SymbolpickerComponent implements OnInit {

  symbols: any[] = ["anchor","address-book","alarm-clock","archway","atlas","bath"];

  constructor() {}

  ngOnInit() {
  }

}
