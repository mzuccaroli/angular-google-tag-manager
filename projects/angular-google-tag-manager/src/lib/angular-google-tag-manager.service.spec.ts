import {inject, TestBed} from '@angular/core/testing';

import {GoogleTagManagerService} from './angular-google-tag-manager.service';

describe('GoogleTagManagerService', () => {
  const testobject = {testkey: 'testvalue'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleTagManagerService]
    });
    window['dataLayer'] = null;
  });

  it('should be created',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        expect(service).toBeTruthy();
      }));

  it('should provide a dataLayer taken from the global window variable',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        expect(service.getDataLayer()).toEqual([]);
        window['dataLayer'] = [testobject];
        expect(service.getDataLayer()).toEqual([testobject]);
      }));

  it('should init the GTM datalayer on first push item',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        service.pushTag(testobject);
        expect(window['dataLayer'][0].event).toEqual('gtm.js');
        // expect(window['dataLayer'][1]).toEqual(testobject);
      }));

  it('should be push objects in the datalayer',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        service.pushTag(testobject);
        expect(window['dataLayer'][1]).toEqual(testobject);
        expect(window['dataLayer'][2]).toBeFalsy();
        service.pushTag(testobject);
        expect(window['dataLayer'][1]).toEqual(testobject);
        expect(window['dataLayer'][2]).toEqual(testobject);
      }));

  it('should be able to initialize the dom with an iframe and a script element',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        service.pushTag(testobject);
        const iframe = document.querySelector('body > noscript > iframe');
        expect(iframe).toBeTruthy();
        expect(iframe.getAttribute('src')).toContain('//www.googletagmanager.com/ns.html?id=');
        const script = document.querySelector('#GTMscript');
        expect(script).toBeTruthy();
        expect(script.getAttribute('src')).toContain('//www.googletagmanager.com/gtm.js?id=');
      }));

  it('should be able to initialize the datalayer with some defaults values of a page',
      inject([GoogleTagManagerService], (service: GoogleTagManagerService) => {
        service.pushTag(testobject);
        expect(window['dataLayer'][0]['gtm.start']).toBeTruthy();
        expect(window['dataLayer'][0]['event']).toEqual('gtm.js');
      }));
});
