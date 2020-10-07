import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

const routes: Routes = [
  {
    path: 'page1',
    component: Page1Component,
  },
  {
    path: 'page2',
    component: Page2Component,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-PV8586C',
      // gtm_auth: YOUR_GTM_AUTH,
      // gtm_preview: YOUR_GTM_ENV
    })
  ],
  // OLD PROVIDER VERSION
  // providers: [
  //   { provide: 'googleTagManagerId', useValue: 'GTM-PV8586C' }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
