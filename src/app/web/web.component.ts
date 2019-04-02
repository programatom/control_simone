import { Component, OnInit } from '@angular/core';
declare function initPlugins();

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styles: []
})
export class WebComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins()
  }

}
