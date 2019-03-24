import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { ModelComponent } from './model/model.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
   path: 'home',
   component: HomeComponent
 },
 {
   path: 'about',
   component: AboutComponent
 },
 {
   path: 'work',
   component: WorkComponent
 },
 {
   path: 'model/:id',
   component: ModelComponent
 },
 {
   path: 'contact',
   component: ContactComponent
 },
 {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
