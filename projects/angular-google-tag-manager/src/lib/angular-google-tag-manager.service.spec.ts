import {inject, TestBed, waitForAsync} from '@angular/core/testing';

import { GoogleTagManagerService } from './angular-google-tag-manager.service';

describe('GoogleTagManagerService', () => {
  const testObject = { testKey: 'testValue' };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          GoogleTagManagerService,
          {provide: 'googleTagManagerId', useValue: 'TEST_GTM_ID'}
        ]
      });
      window.dataLayer = [];
    })
  );

  it('should be created',
    inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
      expect(service).toBeTruthy();
    }));

  it('should provide a dataLayer taken from the global window variable',
    inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
      expect(service.getDataLayer()).toEqual([]);
      window.dataLayer = [testObject];
      expect(service.getDataLayer()).toEqual([testObject]);
    }));

  it('should init the GTM dataLayer on first push item',
    inject([GoogleTagManagerService], async (service: GoogleTagManagerService) => {
      await service.pushTag(testObject);
      expect(window.dataLayer[0].event).toEqual('gtm.js');
    }));

  it('should be push objects in the dataLayer',
    inject([GoogleTagManagerService], async (service: GoogleTagManagerService) => {
      await service.pushTag(testObject);
      expect(window.dataLayer[1]).toEqual(testObject);
      expect(window.dataLayer[2]).toBeFalsy();
      // we know it is loaded so no need to call .then on pushTag here
      await service.pushTag(testObject);
      expect(window.dataLayer[1]).toEqual(testObject);
      expect(window.dataLayer[2]).toEqual(testObject);
      expect(window.dataLayer[3]).toBeFalsy();
    }));

  it('should be able to initialize the dom with an iframe and a script element',
    inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
      service.pushTag(testObject).then(() => {
        // const iframe = document.querySelector('body > noscript > iframe');
        // expect(iframe).toBeTruthy();
        // expect(iframe.getAttribute('src')).toContain('https://www.googletagmanager.com/ns.html?id=');
        const script = document.querySelector('#GTMscript');
        expect(script).toBeTruthy();
        expect(script.getAttribute('src')).toContain('https://www.googletagmanager.com/gtm.js?id=');
      });
    }));

  it('should be able to initialize the dataLayer with some defaults values of a page',
    inject([GoogleTagManagerService], async (service: GoogleTagManagerService) => {
      await service.pushTag(testObject);
      expect(window.dataLayer[0]['gtm.start']).toBeTruthy();
      expect(window.dataLayer[0].event).toEqual('gtm.js');
    }));
});
