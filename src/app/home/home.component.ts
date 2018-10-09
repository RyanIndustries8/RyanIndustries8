import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $:any;
declare var ScrollMagic: any;
declare var TweenMax: any;
declare var events: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logo = './assets/icons/logo.png'
  // intro: object [];
  socialmedia: any;

  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

public  ngOnInit() {



    $(document).ready(function() {

      //Explore Arrow
      $('.introBtn').mouseover(function(){
      	$('.exploreArrow').addClass('start');
      });

      $('.introBtn').mouseout(function(){
      	$('.exploreArrow').removeClass('start');
      });

      //Nav Menu Scroll
      $('.easyScroll').on('click', function(e) {
      	e.preventDefault();

      	var place = this.hash,
      			$place = $(place);
      	$('html, body').stop().animate({
      		'scrollTop': $place.offset().top
      	}, 1250, 'swing', function() {
      		window.location.hash = place;
      	});
      });

      //Nav Menu Section Hover
      $(".hideme").hide();
      $("nav ul li a").hover(function(e) {
        e.preventDefault();
        $(this).find(".hideme").delay(250).fadeToggle(450);
      });

    });

    //Nav Menu Add Class Active
    $('#one').addClass("active");

    $(document).scroll(function () {
      //Smooth Scrolling for Nav Menu and Explore Link on Home Frame
    var scrollSection = $(document).scrollTop();
    $('nav ul li a').each(function (){
    	var currentLink = $(this);
    	var refFlement = $(currentLink.attr("href"));
    	if (refFlement.position().top <= scrollSection && refFlement.position().top + refFlement.height() > scrollSection) {
          $('nav ul li a').removeClass("active");
          currentLink.addClass("active");
        }
    	});

    });


    //Init Scroll Magic
      var controller = new ScrollMagic.Controller();
      //Pinned Stripped Background
      var pinIntroScene = new ScrollMagic.Scene({
        triggerElement: '#pinned-trigger1',
        duration: $(window).height() - 100,
        triggerHook: 0,
        reverse: true
      })
      .setPin('#pinned-element1')
      .addTo(controller);

      var introScene = new ScrollMagic.Scene ({
        triggerElement: '#navTrigger',
        triggerHook: 'onEnter'
      })
      .setClassToggle('#pinned-nav', 'fade-in')
      .addTo(controller);

      var LgCog = new ScrollMagic.Scene({
        triggerElement: '#blank',
        triggerHook: 'onEnter',
        duration: '200%',
        reverse: true
      })
      .setTween(TweenMax.to('#lgcog', 1, {css:{rotation:-360, rotation:360}}))
      .addTo(controller);

      var SmCog = new ScrollMagic.Scene({
        triggerElement: '#blank',
        triggerHook: 'onEnter',
        duration: $(window).height(),
        reverse: true
      })
      .setTween(TweenMax.to('#smcog', 5, {css:{rotation:360, rotation:-360}}))
      .addTo(controller);

      var ryan = new ScrollMagic.Scene({
        triggerElement: '#home',
        triggerHook: 0,
        duration: 300,
        reverse: true
      })
      .setPin('#home')
      .setTween(TweenMax.to('#RyanIndustries8', .3, {css:{scale:.3}}))
      .addTo(controller);
      
       this.http.get<any>('./assets/socialMedia.json').subscribe(
         data => {
           this.socialmedia = data;
         });
  }

}
