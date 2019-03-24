import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'About';
  // aboutRec: any;

  constructor( private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

public  ngOnInit() {
    $(window).scroll(function() {
      const offset = $(window).scrollTop();

      if (offset < 0) {

        $('#navLogo').removeClass('animateLogo');
      } else {
        $('#navLogo').addClass('animateLogo');
      }
    });

    $(document).ready(function() {
      $('#navLogo').addClass('animateLogo');
    });

     // this.http.get<any>('./assets/aboutRec.json').subscribe(
     //   data => {
     //     this.aboutRec = data;
     //   });
  }
}
