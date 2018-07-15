import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../../../providers/canvas.service';
import { UIService } from '../../../providers/ui.service';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrls: ['./layers-panel.component.scss']
})
export class LayersPanelComponent implements OnInit {

  state: any[];

  constructor(
    public canvas: CanvasService,
    public ui: UIService,
  ) { }

  ngOnInit() {

    this.canvas.stateEvent.subscribe((newState) => {
      this.state = newState;
    })

  }

  // TODO: Fix consistent updating of layers panel
  // TODO: Fix buggy selection of elements on multiple artboards
  // TODO: Allow to select multiple layers with ctrl and shift
  // TODO: Highlight selected layers

  getIcon(obj: any) {
    switch (obj.type) {
      case "circle": return "circle";
      case "rect": return "rectangle-landscape";
      case "line": return "drafting-compass";
      case "i-text": return "font";
      case "group": return "object-ungroup";
    }
    return obj.type;
  }

  getTitle(obj: any) {
    switch (obj.type) {
      case "circle": return "Circle";
      case "rect": return "Rectangle";
      case "line": return "Line";
      case "i-text": return "Text";
      case "group": return "Group";
    }
    return obj.type.charAt(0).toUpperCase() + obj.type.slice(1);
  }

  getDescription(obj: any) {
    switch (obj.type) {
      case "circle":
      case "rect": return "W:"+ this.calcScaledWidth(obj) +", H: "+ this.calcScaledHeight(obj);
      case "i-text": return '"'+ obj.text + '"';
      case "group": return obj.objects.length +" items";
    }
    return "";
  }

  private calcScaledWidth(obj) {
    return Math.round(obj.width * obj.scaleX);
  }
  
  private calcScaledHeight(obj) {
    return Math.round(obj.height * obj.scaleY);
  }

}
