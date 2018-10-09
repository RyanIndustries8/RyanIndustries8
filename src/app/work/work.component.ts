import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  title = "Projects";
  // viewMode = 'work'; For ngSwitchCase
  projects: any;
  modelwork: any;

  constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient, public sanitizer: DomSanitizer ) {
    this.sanitizer = sanitizer;

    this.route.params.subscribe(params => {this.modelwork = params['id'];});
  }

 ngOnInit(): void {
    this.http.get<any>('./assets/projects.json').subscribe(
      data => {
        this.projects = data;
      })

    $(document).ready(function() {
      $(".tag").hide();
      $(".grid-item").hover(function() {
        $(this).children(".tag").stop(true, true).slideToggle(500);
         return false;
      })
    });

}
}
