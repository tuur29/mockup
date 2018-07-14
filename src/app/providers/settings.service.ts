import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';


@Injectable()
export class SettingsService {

  @LocalStorage() darkmode: boolean = false;

  constructor() {
    
  }

}
