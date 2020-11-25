import { Inject, Injectable, Optional } from '@angular/core';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private isLoaded = false;

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    },
  };

  constructor(
    @Optional()
    @Inject('googleTagManagerConfig')
    public config: GoogleTagManagerConfig = { id: null },
    @Optional() @Inject('googleTagManagerId') public googleTagManagerId: string,
    @Optional()
    @Inject('googleTagManagerAuth')
    public googleTagManagerAuth: string,
    @Optional()
    @Inject('googleTagManagerPreview')
    public googleTagManagerPreview: string
  ) {
    if (this.config == null) {
      this.config = { id: null };
    }

    this.config = {
      ...this.config,
      id: googleTagManagerId || this.config.id,
      gtm_auth: googleTagManagerAuth || this.config['gtm_auth'],
      gtm_preview: googleTagManagerPreview || this.config['gtm_preview'],
    };
    if (this.config.id == null) {
      throw new Error('Google tag manager ID not provided.');
    }
  }

  public getDataLayer() {
    const window = this.browserGlobals.windowRef();
    window['dataLayer'] = window['dataLayer'] || [];
    return window['dataLayer'];
  }

  private pushOnDataLayer(obj: object) {
    const dataLayer = this.getDataLayer();
    dataLayer.push(obj);
  }

  public addGtmToDom() {
    if (this.isLoaded) {
      return;
    }
    const doc = this.browserGlobals.documentRef();
    this.pushOnDataLayer({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    const gtmScript = doc.createElement('script');
    gtmScript.id = 'GTMscript';
    gtmScript.async = true;
    gtmScript.src = this.applyGtmQueryParams(
      'https://www.googletagmanager.com/gtm.js'
    );
    doc.head.insertBefore(gtmScript, doc.head.firstChild);

    this.isLoaded = true;
  }

  public pushTag(item: object) {
    if (!this.isLoaded) {
      this.addGtmToDom();
    }
    this.pushOnDataLayer(item);
  }

  private applyGtmQueryParams(url: string) {
    if (url.indexOf('?') === -1) {
      url += '?';
    }

    return (
      url +
      Object.keys(this.config)
        .filter((k) => this.config[k])
        .map((k) => `${k}=${this.config[k]}`)
        .join('&')
    );
  }
}
