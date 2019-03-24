import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $: any;
declare var ScrollMagic: any;
declare var TweenMax: any;
declare var events: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logo = './assets/icons/logo.png';
  sm: any;

  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

public ngOnInit() {

  $(window).scroll(function() {
    const offset = $(window).scrollTop();

    if (offset < 550) {

      $('#navLogo').removeClass('animateLogo');
    } else {
      $('#navLogo').addClass('animateLogo');
    }
  });

    $(document).ready(function() {

      // Explore Arrow
      $('.introBtn').mouseover(function() {
        $('.exploreArrow').addClass('start');
      });

      $('.introBtn').mouseout(function() {
        $('.exploreArrow').removeClass('start');
      });

      // Nav Menu Scroll
      $('.easyScroll').on('click', function(e) {
        e.preventDefault();

        const place = this.hash,
          $place = $(place);
            $('html, body').stop().animate({
              'scrollTop': $place.offset().top
            }, 1000, 'linear', function() {
              window.location.hash = place;
            });

      });

      // Nav Menu Section Hover
      $('.hideme').hide();
      $('nav ul li a').hover(function(e) {
        e.preventDefault();
        $(this).find('.hideme').fadeToggle(450);
      });

    });

    // Nav Menu Add Class Active
    $('#one').addClass('active');

    $(document).scroll(function () {
      // Smooth Scrolling for Nav Menu and Explore Link on Home Frame
    const scrollSection = $(document).scrollTop();
    $('nav ul li a').each(function () {
      const currentLink = $(this);
      const refFlement = $(currentLink.attr('href'));
      if (refFlement.position().top <= scrollSection && refFlement.position().top + refFlement.height() > scrollSection) {
          $('nav ul li a').removeClass('active');
          currentLink.addClass('active');
        }
      });

    });


    // Init Scroll Magic
      const controller = new ScrollMagic.Controller();
      // Pinned Stripped Background
      const pinIntroScene = new ScrollMagic.Scene({
        triggerElement: '#pinned-trigger1',
        duration: '400%',
        triggerHook: 0,
        reverse: true
      })
      .setPin('#pinned-element1')
      .addTo(controller);

      // Side Navigation
      const introScene = new ScrollMagic.Scene ({
        triggerElement: '#navTrigger',
        triggerHook: 'onEnter'
      })
      .setClassToggle('#pinned-nav', 'fade-in')
      .addTo(controller);

      // RyanIndustries8 home animation to reduce scale
      const ryan = new ScrollMagic.Scene({
        triggerElement: '#home',
        triggerHook: 0,
        duration: $(window).height(),
        reverse: true
      })
      .setPin('#home')
      .setTween(TweenMax.to('#RyanIndustries8', 1, {css: { scale: .3 }}))
      .addTo(controller);

      // About Screen Pinned
      const aboutScene = new ScrollMagic.Scene({
        triggerElement: '#about',
        triggerHook: 'onLeave',
        duration: $(window).height() * 1.5,
        reverse: true
      })
      .setPin('#about')
      .addTo(controller);

      // About/Port Fixed
      const apScene = new ScrollMagic.Scene({
        triggerElement: '#port',
        triggerHook: 'onEnter',
        duration: '100%',
        reverse: true
      })
      .setClassToggle('#about', 'new').addTo(controller);

      // Portfolio Screen Pinned
      const portScene = new ScrollMagic.Scene({
        triggerElement: '#port',
        triggerHook: 'onLeave',
        duration: '75%',
        reverse: true
      })
      .setPin('#port')
      .addTo(controller);

      // Large rotating cog on Port slide
      const LgCog = new ScrollMagic.Scene({
        triggerElement: '#blank',
        triggerHook: 'onEnter',
        duration: '100%',
        reverse: true
      })
      .setTween(TweenMax.to('#lgcog', 5, {rotation: -360 }))
      .addTo(controller);

      this.http.get<any>('./assets/sm.json').subscribe(
        data => {
          this.sm = data;
        });

}
}
