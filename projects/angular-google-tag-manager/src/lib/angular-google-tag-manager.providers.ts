import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

export function provideGoogleTagManager(
  config: GoogleTagManagerConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: 'googleTagManagerId', useValue: config.id },
    { provide: 'googleTagManagerAuth', useValue: config.gtm_auth },
    { provide: 'googleTagManagerPreview', useValue: config.gtm_preview },
    {
      provide: 'googleTagManagerResourcePath',
      useValue: config.gtm_resource_path,
    },
    { provide: 'googleTagManagerCSPNonce', useValue: config.gtm_csp_none },
    { provide: 'googleTagManagerMode', useValue: config.gtm_mode },
  ]);
}
