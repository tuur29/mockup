import { Component, OnInit } from '@angular/core';
import { UIService } from '../../providers/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toolboxCollapsed: boolean = true;
  panelCollapsed: boolean = false;

  textPanelDisabled: boolean = true;
  textPanelCollapsed: boolean = true;

  constructor(
    public ui: UIService,
  ) { }

  ngOnInit() {
    this.ui.homeComponent = this;
  }

  togglePanel() {
    // TODO: animate panel collapsing
    this.panelCollapsed = !this.panelCollapsed;
  }

}
