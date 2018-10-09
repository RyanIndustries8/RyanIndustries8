import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'RyanIndustries8';
  logo = './assets/icons/logo.png'
  contactMe: string;
  socialmedia: any;
  linkingPgs: object;


  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

  public ngOnInit(): void
    {

      $(window).scroll(function(){
        let offset = $(window).scrollTop();

        if (offset > 550) {

          $('#navLogo').css({'margin-top':'0','transition':'all 1s','opacity':'1'});
        } else {
          $('#navLogo').css({'margin-top':'-50px','transition':'all 1s','opacity':'0'});
        }
      })

      $(document).ready(function(){
        // $("#gears").get(0).play();
        $("menu").hide();

        $("#menuIcon").on('click', function(){
          // $("#menuIcon").toggleClass('rotate');
          // $("menu").toggle('size', { origin: ["top", "right"] }, 1000);
          // $(".name").animate({
          //   width: "toggle"
          // });
          $("menu").slideToggle(500);
        });

      });

      this.http.get<any>('./assets/contactMe.json').subscribe(
        data => {
          this.contactMe = data;
        })

      this.http.get<any>('./assets/socialMedia.json').subscribe(
        data => {
          this.socialmedia = data;
        })

      this.http.get<any>('./assets/headerInternalLinks.json').subscribe(
        data => {
          this.linkingPgs = data;
        })
    }

}
