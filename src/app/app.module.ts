import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { HeaderComponent } from './header/header.component';
import { SafePipe } from './safe.pipe';
import { ModelComponent } from './model/model.component';
import { ContactComponent } from './contact/contact.component';
import { LgcogComponent } from './lgcog/lgcog.component';
import { SmcogComponent } from './smcog/smcog.component';
import { MdcogComponent } from './mdcog/mdcog.component';
import { socialmediaComponent } from './socialmedia/socialmedia.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    WorkComponent,
    HeaderComponent,
    SafePipe,
    ModelComponent,
    ContactComponent,
    LgcogComponent,
    SmcogComponent,
    MdcogComponent,
    socialmediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
