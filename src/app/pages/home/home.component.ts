import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toolboxCollapsed: boolean = true;
  panelCollapsed: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePanel() {
    // TODO: animate panel collapsing
    this.panelCollapsed = !this.panelCollapsed;
  }

}
