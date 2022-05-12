import { NgModule, ModuleWithProviders } from '@angular/core';
import { GoogleTagManagerConfigService } from './angular-google-tag-manager-config.service';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

@NgModule()
export class GoogleTagManagerModule {
  public static forRoot(
    config?: GoogleTagManagerConfig
  ): ModuleWithProviders<GoogleTagManagerModule> {
    return {
      ngModule: GoogleTagManagerModule,
      providers: [{ provide: GoogleTagManagerConfigService, useValue: config }],
    };
  }
}
