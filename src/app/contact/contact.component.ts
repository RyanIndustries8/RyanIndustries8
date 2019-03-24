import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  logo = './assets/icons/logo.png';
  sm: any;

  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

public ngOnInit(): void {
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

  this.http.get<any>('./assets/sm.json').subscribe(
    data => {
      this.sm = data;
    });
    
  }

}
