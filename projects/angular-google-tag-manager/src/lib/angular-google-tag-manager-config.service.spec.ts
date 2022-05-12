import { inject, TestBed } from '@angular/core/testing';
import { GoogleTagManagerModule } from './angular-google-tag-manager.module';
import {
  GoogleTagManagerConfigService,
  GoogleTagManagerConfiguration,
} from './angular-google-tag-manager-config.service';

describe('GoogleTagManagerConfigService', () => {
  describe('can set config with id only', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          GoogleTagManagerModule.forRoot({
            id: 'TEST_GTM_ID',
          }),
        ],
        providers: [
          {
            provider: GoogleTagManagerConfigService,
            useClass: GoogleTagManagerConfiguration,
          },
        ],
      });
      const googleTagManagerConfigService =
        TestBed.inject<GoogleTagManagerConfiguration>(
          GoogleTagManagerConfiguration
        );
      googleTagManagerConfigService.set({ id: 'TEST_GTM_ID' });
    });

    it('returns config with expected id', inject(
      [GoogleTagManagerConfiguration],
      (service: GoogleTagManagerConfiguration) => {
        expect(service).toBeTruthy();
        const config = service.get();
        expect(config).toBeTruthy();
        expect(config.id).toBe('TEST_GTM_ID');
        expect(config.gtm_auth).toBeFalsy();
        expect(config.gtm_preview).toBeFalsy();
      }
    ));
  });

  describe('with other options configured', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          GoogleTagManagerModule.forRoot({
            id: 'TEST_GTM_ID',
            gtm_auth: 'TEST_GTM_AUTH',
            gtm_preview: 'TEST_GTM_PREVIEW',
          }),
        ],
        providers: [
          {
            provider: GoogleTagManagerConfigService,
            useClass: GoogleTagManagerConfiguration,
          },
        ],
      });
      const googleTagManagerConfigService =
        TestBed.inject<GoogleTagManagerConfiguration>(
          GoogleTagManagerConfiguration
        );
      googleTagManagerConfigService.set({
        id: 'TEST_GTM_ID',
        gtm_auth: 'TEST_GTM_AUTH',
        gtm_preview: 'TEST_GTM_PREVIEW',
      });
    });

    it('returns config with expected id, gtm_auth and gtm_preview', inject(
      [GoogleTagManagerConfiguration],
      (service: GoogleTagManagerConfiguration) => {
        expect(service).toBeTruthy();
        const config = service.get();
        expect(config).toBeTruthy();
        expect(config.id).toBe('TEST_GTM_ID');
        expect(config.gtm_auth).toBe('TEST_GTM_AUTH');
        expect(config.gtm_preview).toBe('TEST_GTM_PREVIEW');
      }
    ));
  });
});
