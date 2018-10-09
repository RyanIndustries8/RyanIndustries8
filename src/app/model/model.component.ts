import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  projects: any;
  chosenIndex: any;

  constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;

 }

  public ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.chosenIndex = params['id'];

      this.http.get<any>('./assets/projects.json').subscribe(data => {
        this.projects = data.filter(d => d['id'] == this.chosenIndex);
      })
    });

  }
}
