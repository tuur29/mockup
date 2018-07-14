import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-symbolpicker",
  templateUrl: "./symbolpicker.component.html",
  styleUrls: ["./symbolpicker.component.scss"],
})
export class SymbolpickerComponent implements OnInit {

  @Output() pick: EventEmitter<any> = new EventEmitter();

  // TODO: add beter symbols and change them to grouped objects
  symbols: any[] = [
    // login button
    {version:"2.3.3",objects:[{"type":"rect","version":"2.3.3","originX":"left","originY":"top","left":0,"top":0,"width":200,"height":75,"fill":"#ffffff","stroke":"#000000","strokeWidth":3,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.83,"scaleY":0.83,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","version":"2.3.3","originX":"left","originY":"top","left":25,"top":10,"width":70.51,"height":45.2,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Login","fontSize":40,"fontWeight":"normal","fontFamily":"TimesNewRoman","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}]},
    // logout button
    {version:"2.3.3",objects:[{"type":"rect","version":"2.3.3","originX":"left","originY":"top","left":0,"top":0,"width":200,"height":75,"fill":"#ffffff","stroke":"#000000","strokeWidth":3,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.83,"scaleY":0.83,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"i-text","version":"2.3.3","originX":"left","originY":"top","left":25,"top":10,"width":70.51,"height":45.2,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Logout","fontSize":40,"fontWeight":"normal","fontFamily":"TimesNewRoman","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"styles":{}}]},
  ];

  constructor() {}

  ngOnInit() {
  }

}
