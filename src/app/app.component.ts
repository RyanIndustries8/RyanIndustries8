import { Component } from '@angular/core';
import * as $ from 'jquery';
import {TweenLite, Power2, TimelineMax, TweenMax} from "gsap";
import * as ScrollMagic from 'ScrollMagic';
// import "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js";
import "scrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public ngOnInit(){


  }
}
