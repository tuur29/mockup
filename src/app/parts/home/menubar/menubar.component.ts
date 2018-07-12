import { Component, OnInit } from '@angular/core';

const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openGit() {
    var win = new BrowserWindow({
      width: 800,
      height: 600,
      center: true,
      resizable: false,
      frame: true,
      transparent: false
    });
    // Load the page + route
    win.loadURL('file://' + __dirname + '/index.html#/git');
  }

}
