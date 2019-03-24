import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-sm',
  templateUrl: './sm.component.html',
  styleUrls: ['./sm.component.css']
})
export class SmComponent implements OnInit {

    sm: any;

  constructor(private http: HttpClient, private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

  public ngOnInit(): void {
    this.http.get<any>('./assets/sm.json').subscribe(
      data => {
        this.sm = data;
      });
  }

}
