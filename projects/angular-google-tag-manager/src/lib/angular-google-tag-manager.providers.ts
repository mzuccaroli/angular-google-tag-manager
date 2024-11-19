import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { GoogleTagManagerConfigService } from './angular-google-tag-manager-config.service';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

export function provideGoogleTagManager(
  config: GoogleTagManagerConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: GoogleTagManagerConfigService, useValue: config },
  ]);
}
