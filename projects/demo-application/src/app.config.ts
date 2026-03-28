import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideGoogleTagManager } from 'projects/angular-google-tag-manager/src/lib/angular-google-tag-manager.providers';
import { Page1Component } from './app/page1/page1.component';
import { Page2Component } from './app/page2/page2.component';

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
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideGoogleTagManager({
      id: 'GTM-PV8586C',
      // You can provide the nonce automically by providing the value through Angular. See: https://angular.io/guide/security#content-security-policy
      // gtm_csp_none: 'CSP-NONCE',
      // gtm_auth: YOUR_GTM_AUTH,
      // gtm_preview: YOUR_GTM_ENV
    }),
  ],
};
