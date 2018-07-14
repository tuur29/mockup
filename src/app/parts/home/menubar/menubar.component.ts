import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';
import { CanvasService } from '../../../providers/canvas.service';

const opn = require('opn');

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor(
    public electron: ElectronService,
    public canvas: CanvasService,
  ) { }

  ngOnInit() {
  }

  openHelpSite() {
    opn("https://tuur29.github.com/mockup/");
  }

  openDevTools() {
    this.electron.remote.webContents.getFocusedWebContents().openDevTools();
  }

  zoom(fraction: number) {
    console.log(fraction);
  }

  exitApp() {
    this.electron.remote.app.quit();
  }

  openPageInPopup(path: string, width: number = 1024, height: number = 768, seperate: boolean = false) {

    const BrowserWindow = this.electron.remote.BrowserWindow;

    let options = {
      width: width,
      height: height,
      minWidth: width < 800 ? width : 800,
      minHeight: height < 600 ? height : 600,
      autoHideMenuBar: true,
      show: false
    };

    if (!seperate) {
      let currentWindow = this.electron.remote.BrowserWindow;
      options['parent'] = currentWindow;
    }

    let win = new BrowserWindow(options);
    if (this.electron.isDev()) {
      win.loadURL('http://localhost:4200/#/'+path);
    } else {
      win.loadURL("file://" + __dirname +  "/index.html#/"+path);
    }

    win.once('ready-to-show', () => {
      win.show()
    })

  }

}
