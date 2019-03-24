import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'RyanIndustries8';
  logo = './assets/icons/logo.png';
  linkingPgs: any;
  isPopState = false;


  constructor(private http: HttpClient,
              private router: Router,
              public sanitizer: DomSanitizer,
              private locStrat: LocationStrategy) {
    this.sanitizer = sanitizer;
  }

  public ngOnInit(): void {
      this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.router.events.subscribe(event => {
    // Scroll to top if accessing a page, not via browser history stack
    if (event instanceof NavigationEnd && !this.isPopState) {
      window.scrollTo(0, 0);
      this.isPopState = false;
    }

  // Ensures that isPopState is reset
  if (event instanceof NavigationEnd) {
      this.isPopState = false;
    }

  });

  $(document).ready(function() {
  // $("#gears").get(0).play();

  $('#menuIcon').on('click', function() {
    $('menu').toggleClass('wakeme');
    // $('body').toggleClass('noScroll');
  });

  $('a').on('click', function() {
    // $('body').removeClass('noScroll');
    $('menu').removeClass('wakeme');
  });

  $('.name').hide();
  // Logo Text Rollover
  $('#navLogo').hover(function() {
    $('.name').toggle('slide', {
      direction: 'left'
    }, 1000);
  });

  $('#menuIcon').click(function() {
    $('#menuIcon').toggleClass('rotate');
    $('.bar:first-child').toggleClass('rotateL');
    $('.bar:nth-child(2)').toggleClass('slick');
    $('.bar:last-child').toggleClass('rotateR');
});

  });

  this.http.get<any>('./assets/headerInternalLinks.json').subscribe(
  data => {
    this.linkingPgs = data;
  });
    }

}
