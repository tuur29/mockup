import { Injectable } from '@angular/core';
import { HomeComponent } from '../pages/home/home.component';


@Injectable()
export class UIService {

  homeComponent: HomeComponent;

  constructor() {
    
  }

  togglePanel() {
      this.homeComponent.togglePanel();
  }

}
