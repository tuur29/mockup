import { Injectable } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';
import { AppearancePanelComponent } from '../parts/panels/appearance-panel/appearance-panel.component';


@Injectable()
export class UIService {

  homeComponent: HomeComponent;
  appearancePanel: AppearancePanelComponent;

  constructor() {
    
  }

  togglePanel() {
      this.homeComponent.togglePanel();
  }

  setTextPanelEnabled(visible: boolean) {
    this.homeComponent.textPanelDisabled = !visible;
    this.homeComponent.textPanelCollapsed = !visible;
  }

  mirrorProperties(object: any) {
    this.appearancePanel.mirrorProperties(object);
  }

  maskProperties() {
    this.appearancePanel.mirrorProperties(null);
  }

}
