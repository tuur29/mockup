import 'fabric';
import * as jsPDF from 'jspdf';
declare const fabric: any;
var fs = require('fs');

import { Artboard } from "../models/artboard";


export function saveCanvas(artboards: Artboard[], path: string,) {
  let json = artboards.map(artboard => artboard.toJSON());
  console.log(json, path);
  // TODO: implement custom project save format

}


export function exportCanvas(artboards: Artboard[], path: string, type: string) {

  switch (type) {

    case "jpg": {
      artboards.forEach((artboard, i) => {
        let file = convertToJPG(artboard);
        if (file) writeFile(file, prepareSeperateFileName(artboard, path), "base64");
      });
      
      break;
    }

    case "png": {
      artboards.forEach((artboard, i) => {
        let file = convertToPNG(artboard);
        if (file) writeFile(file, prepareSeperateFileName(artboard, path), "base64");
      });

      break;
    }

    case "svg": {
      artboards.forEach((artboard, i) => {
        let file = convertToSVG(artboard);
        if (file) writeFile(file, prepareSeperateFileName(artboard, path), "utf-8");
      });

      break;
    }

    case "pdf": {
      let file = convertToPDF(artboards);
      if (file) writeFile(file, path, "");

      break;
    }
  }

  return null;

}

// HELPERS

function convertToJPG(artboard: Artboard): Buffer {
  artboard.object.setBackgroundColor('#ffffff');
  let temp = dataURItoBuffer(artboard.object.toDataURL({
    format: 'jpeg',
    quality: 0.75 // TODO: add jpg quality slider
  }));
  artboard.object.setBackgroundColor('transparent');
  return temp;
}

function convertToPNG(artboard: Artboard): Buffer {
  return dataURItoBuffer(artboard.object.toDataURL({
    format: 'png',
    multiplier: 2
  }));
}

function convertToSVG(artboard: Artboard) {
  return artboard.object.toSVG();
}

function convertToPDF(artboards: Artboard[]) {
  let pdf = new jsPDF('p', 'mm', 'a4');
  artboards.forEach((artboard, i) => {
    if (i>0) pdf.addPage();
    let data = artboard.object.toDataURL('image/png', 1.0);
    pdf.addImage(data, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
  });
  return new Buffer(pdf.output('arraybuffer'));
}

function prepareSeperateFileName(artboard: Artboard, path: string) {
  let parts = [
    path.slice(0, path.lastIndexOf(".")),
    path.slice(path.lastIndexOf("."), path.length)
  ];

  return parts[0] + "-"+ encodeURI(artboard.name.replace(" ","_")) + parts[1];
}

function writeFile(file: Buffer, filename: string, encoding: string) {
  try {
    fs.writeFile(filename, file, { encoding: encoding }, () => {
      // callback is necessary
    });
  } catch (e) {
    console.error(e);
    alert("Failed to save the file.");
  }
}

// Source: 
function dataURItoBuffer(dataURI: string): Buffer {
  let data = dataURI.replace(/^data:image\/\w+;base64,/, "");
  return new Buffer(data, 'base64');
}