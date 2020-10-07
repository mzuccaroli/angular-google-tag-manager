import { inject, TestBed } from '@angular/core/testing';

import { GoogleTagManagerService } from './angular-google-tag-manager.service';
import { GoogleTagManagerModule } from './angular-google-tag-manager.module';

describe('GoogleTagManagerModule', () => {
  describe('with just id configured', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          GoogleTagManagerModule.forRoot({
            id: 'TEST_GTM_ID',
          }),
        ],
      });
    });

    it('should create a GoogleTagManagerService', inject(
      [GoogleTagManagerService],
      (service: GoogleTagManagerService) => {
        expect(service).toBeTruthy();
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
      });
    });

    it('should create a GoogleTagManagerService', inject(
      [GoogleTagManagerService],
      (service: GoogleTagManagerService) => {
        expect(service).toBeTruthy();
      }
    ));
  });
});
