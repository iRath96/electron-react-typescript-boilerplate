import { jsdom } from 'jsdom';

declare var global: any;
declare var window: any;

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
window.localStorage = window.sessionStorage = {
  getItem(this: any, key: string) {
    return this[key];
  },
  setItem(this: any, key: string, value: any) {
    this[key] = value;
  },
  removeItem(this: any, key: string) {
    this[key] = undefined;
  },
};

var hook = require('css-modules-require-hook');
var sass = require('node-sass');
var path = require('path');

hook({
  extensions: ['.scss'],
  preprocessCss: (css: any, filepath: string) => {
    var result =  sass.renderSync({
      data: css,
      includePaths: [ path.resolve(filepath, '..') ]
    });

    return result.css;
  }
});
