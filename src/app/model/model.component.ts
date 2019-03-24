import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  chosenIndex: any;
  projects: any;
  show: boolean;

  constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient, public sanitizer: DomSanitizer ) {
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

    this.route.params.subscribe(params => {
    this.chosenIndex = params['id'];
// DO NOT FIX THIS TO MATCH THE LINTER, IT WILL BREAK THE DATA/PAGE
    this.http.get<any>('./assets/projects.json').subscribe(data => {
      this.projects = data.filter(d => d['id'] == this.chosenIndex);
    });
  });
  }
}
