import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = "ABOUT";
  aboutContent: any;
  aboutSkill: any;
  aboutRec: any;

  constructor( private http: HttpClient,private router: Router, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
       this.http.get<any>('./assets/aboutSkill.json').subscribe(
         data => {
           this.aboutSkill = data;
         })

     this.http.get<any>('./assets/text.json').subscribe(
       data => {
         this.aboutContent = data;
       })

     this.http.get<any>('./assets/aboutRec.json').subscribe(
       data => {
         this.aboutRec = data;
       })
  }
}
