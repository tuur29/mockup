import { Component, OnInit } from '@angular/core';

import 'fabric';
declare const fabric: any;

import { GitProcess } from 'dugite';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  canvas: any;
  gitoutput: string;

  constructor() { }

  ngOnInit() {
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas = new fabric.Canvas('canvas', { selection: false });

    let red = new fabric.Rect({
      top: 100, left: 0, width: 80, height: 50, fill: 'red' });
    let blue = new fabric.Rect({
      top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
    let green = new fabric.Rect({
      top: 100, left: 100, width: 60, height: 60, fill: 'green' });

    fabric.Object.prototype.transparentCorners = false;

    this.canvas.add(red, blue, green)
  }

  async testGit(gitpath:string, path: string) {
    process.env.LOCAL_GIT_DIRECTORY = gitpath;

    const result = await GitProcess.exec([ 'status' ], path);
    if (result.exitCode === 0) {
      // do some things with the output
      const output = result.stdout
      this.gitoutput = output;
    } else {
      // error handling
      const error = result.stderr
      console.error(error);
      this.gitoutput = error;
    }
    
  }

}
