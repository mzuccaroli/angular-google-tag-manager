import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from 'projects/demo-application/src/app.config';
import { AppComponent } from 'projects/demo-application/src/app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
