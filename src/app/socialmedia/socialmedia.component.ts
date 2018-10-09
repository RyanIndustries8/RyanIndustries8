import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css']
})
export class socialmediaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

  public ngOnInit():void {

    $(document).ready(function() {

      $(".platform").hide();
      $(".social").hover(function() {
        $(".icon").toggleClass("opacit");
        setTimeout(1750);
      });
      $(".icon").hover(function(e) {
        e.preventDefault();
        $(this).prev(".platform").delay(450).fadeToggle(450);
        $(this).find("path").delay(150).toggleClass("bronze");
        $(this).toggleClass("opacit");
      });
    });


    // this.http.get<any>('./assets/socialMedia.json').subscribe(
    //   data => {
    //     this.socialmedia = data;
    //   })
  }

}
