import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

export const GoogleTagManagerConfigService =
  new InjectionToken<GoogleTagManagerConfig>('google-tag-manager-config');

// adapted from https://github.com/auth0/auth0-angular#dynamic-configuration
@Injectable({ providedIn: 'root' })
export class GoogleTagManagerConfiguration {
  private _googleTagManagerConfig: GoogleTagManagerConfig = {
    id: null,
    gtm_auth: '',
    gtm_preview: '',
  };

  constructor(
    @Optional()
    @Inject(GoogleTagManagerConfigService)
    googleTagManagerConfig?: GoogleTagManagerConfig
  ) {
    if (googleTagManagerConfig) {
      this.set(googleTagManagerConfig);
    }
  }

  public set(googleTagManagerConfig: GoogleTagManagerConfig): void {
    this._googleTagManagerConfig = googleTagManagerConfig;
  }

  public get(): GoogleTagManagerConfig {
    return this._googleTagManagerConfig;
  }
}

