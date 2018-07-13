import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';

const opn = require('opn');

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(
    public electron: ElectronService,
  ) { }

  ngOnInit() {
  }

  openHelpSite() {
    opn("https://tuur29.github.com/mockup/");
  }

  exitApp() {
    this.electron.remote.app.quit();
  }

  openPageInPopup(path: string, width: number = 1024, height: number = 768, seperate: boolean = false) {

    const BrowserWindow = this.electron.remote.BrowserWindow;

    let options = {
      width: width,
      height: height,
      minWidth: 800,
      minHeight: 600,
      autoHideMenuBar: true
    };

    if (!seperate) {
      let currentWindow = this.electron.remote.BrowserWindow;
      options['parent'] = currentWindow;
    }

    let win = new BrowserWindow(options);
    // TODO: Find way to differ between debug or not
    let debug = true;
    if (debug) {
      win.loadURL('http://localhost:4200/#/'+path);
    } else {
      win.loadURL("file://" + __dirname +  "/index.html#/"+path);
    }

  }

}
