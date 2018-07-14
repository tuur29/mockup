import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../../../providers/canvas.service';
import { ArtboardComponent } from '../artboard/artboard.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  constructor(
    public canvasService: CanvasService,
  ) { }

  ngOnInit() {
  }

  setActive(element: ArtboardComponent) {
    this.canvasService.setActive(element.artboardModel);
  }

}
