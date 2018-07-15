import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';
import { CanvasService } from '../../../providers/canvas.service';
import { UIService } from '../../../providers/ui.service';
import { SettingsService } from '../../../providers/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorage } from 'ngx-store';

const opn = require('opn');

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  translations: any;
  // TODO: move savepath to better place
  @SessionStorage() savepath: string;

  constructor(
    public electron: ElectronService,
    public canvas: CanvasService,
    public ui: UIService,
    public settings: SettingsService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.translate.get([
      'MENUBAR.FILE.FILENAME',
      'MENUBAR.FILE.FILESNAME',
      'MENUBAR.FILE.OPENPROJECT',
      'MENUBAR.FILE.SAVE.DIALOGTITLE',
      'MENUBAR.FILE.SAVEAS.EXPORT',
      'MENUBAR.FILE.SAVEAS.JPG',
      'MENUBAR.FILE.SAVEAS.PNG',
      'MENUBAR.FILE.SAVEAS.SVG',
      'MENUBAR.FILE.SAVEAS.PDF',
    ]).subscribe((array) => {
      this.translations = array;
    })
  }

  // TODO: link menubar items to keyboard shortcuts

  // file

  exitApp() {
    this.electron.remote.app.quit();
  }

  openProject() {
    let path = this.electron.remote.dialog.showOpenDialog({
      title: this.translations['MENUBAR.FILE.OPENPROJECT'],
      filters: [{name:this.translations['MENUBAR.FILE.FILESNAME'], extensions:["html"]}]
    });

    if (path)
      console.log(path[0]);
  }

  save(copy: boolean = false) {

    if (!copy || this.savepath)
      this.canvas.save(this.savepath);

    else {

      this.electron.remote.dialog.showSaveDialog({
        title: this.translations['MENUBAR.FILE.SAVEAS.DIALOGTITLE'],
        filters: [ { name: this.translations['MENUBAR.FILE.FILENAME'], extensions:["html"] } ]
      }, (path) => {
        if (path) {
          if (!copy)
            this.savepath = path;
          this.canvas.save(path);
        }
      });

    }

  }

  export() {

    this.electron.remote.dialog.showSaveDialog({
      title: this.translations['MENUBAR.FILE.SAVEAS.EXPORT'],
      filters: [
        { name: this.translations['MENUBAR.FILE.SAVEAS.JPG'], extensions:["jpg"] },
        { name: this.translations['MENUBAR.FILE.SAVEAS.PNG'], extensions:["png"] },
        { name: this.translations['MENUBAR.FILE.SAVEAS.SVG'], extensions:["svg"] },
        { name: this.translations['MENUBAR.FILE.SAVEAS.PDF'], extensions:["pdf"] },
      ]
    }, (path) => {
      if (path)
        this.canvas.export(path, path.substring(path.lastIndexOf(".")+1, path.length));
    });

  }

  // edit

  undo() {
    if (this.canvas.previousStates.length > 0)
      this.canvas.undo();
  }

  redo() {
    if (this.canvas.futureStates.length > 0)
      this.canvas.redo();
  }

  cut() {
    this.canvas.copy(true);
  }

  copy() {
    this.canvas.copy();
  }

  paste() {
    this.canvas.paste();
  }

  group() {
    this.canvas.groupSelection();
  }

  ungroup() {
    this.canvas.unGroupSelection();
  }

  delete() {
    this.canvas.deleteSelection();
  }


  // view

  preview() {
    opn(this.savepath);
  }

  toggleFullscreen() {
    this.electron.remote.BrowserWindow.getFocusedWindow().setFullScreen(
      !this.electron.remote.BrowserWindow.getFocusedWindow().isFullScreen()
    );
  }

  zoom(fraction: number) {
    this.electron.webFrame.setZoomFactor(fraction);
  }

  // tools

  openDevTools() {
    this.electron.remote.webContents.getFocusedWebContents().openDevTools();
  }

  // help

  checkUpdates() {
    // TODO: Setup autoupdater
    opn("https://www.github.com/tuur29/mockup/releases");
  }
  
  openHelpSite() {
    opn("https://tuur29.github.com/mockup/");
  }


  // helpers

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
