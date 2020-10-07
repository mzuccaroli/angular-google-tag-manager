import { NgModule, ModuleWithProviders } from '@angular/core';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

@NgModule()
export class GoogleTagManagerModule {
  public static forRoot(
    config: GoogleTagManagerConfig
  ): ModuleWithProviders<GoogleTagManagerModule> {
    return {
      ngModule: GoogleTagManagerModule,
      providers: [{ provide: 'googleTagManagerConfig', useValue: config }],
    };
  }
}
