import {
  DOCUMENT,
  ɵDomAdapter as DomAdapter,
  ɵgetDOM as getDOM,
  isPlatformServer,
} from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { GoogleTagManagerConfiguration } from './angular-google-tag-manager-config.service';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private isLoaded = false;
  private config: GoogleTagManagerConfig | null;
  private dom: DomAdapter;

  private get browserGlobals() {
    return {
      windowRef: (): any => {
        return window || {};
      },
      documentRef: (): any => {
        return this._doc;
      },
    };
  }

  constructor(
    @Optional()
    @Inject(GoogleTagManagerConfiguration)
    public googleTagManagerConfiguration: GoogleTagManagerConfiguration,
    @Optional() @Inject('googleTagManagerId') public googleTagManagerId: string,
    @Optional()
    @Inject('googleTagManagerMode')
    public googleTagManagerMode: 'silent' | 'noisy' = 'noisy',
    @Optional()
    @Inject('googleTagManagerAuth')
    public googleTagManagerAuth: string,
    @Optional()
    @Inject('googleTagManagerPreview')
    public googleTagManagerPreview: string,
    @Optional()
    @Inject('googleTagManagerResourcePath')
    public googleTagManagerResourcePath: string,
    @Optional()
    @Inject('googleTagManagerCSPNonce')
    public googleTagManagerCSPNonce: string,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private _doc: Document
  ) {
    this.dom = getDOM();
    this.config = this.googleTagManagerConfiguration?.get();
    if (this.config == null) {
      this.config = { id: null };
    }

    this.config = {
      ...this.config,
      id: googleTagManagerId || this.config.id,
      gtm_auth: googleTagManagerAuth || this.config.gtm_auth,
      gtm_preview: googleTagManagerPreview || this.config.gtm_preview,
      gtm_resource_path:
        googleTagManagerResourcePath || this.config.gtm_resource_path,
    };
    if (this.config.id == null) {
      return;
    }
  }

  private checkForId(): boolean {
    if (this.googleTagManagerMode !== 'silent' && !this.config.id) {
      throw new Error('Google tag manager ID not provided.');
    } else if (!this.config.id) {
      return false;
    }
    return true;
  }

  public getDataLayer(): any[] {
    this.checkForId();
    const window = this.browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }

  private pushOnDataLayer(obj: object): void {
    this.checkForId();
    const dataLayer = this.getDataLayer();
    dataLayer.push(obj);
  }
  public addGtmToDom(): Promise<boolean> {
    if (this.isLoaded) {
      return Promise.resolve(this.isLoaded);
    } else if (!this.checkForId()) {
      return Promise.resolve(false);
    }

    if (isPlatformServer(this.platformId)) {
      this.addGtmToDomInServer();
      return Promise.resolve(true);
    } else {
      return this.addGtmToDomInBrowser();
    }
  }

  private addGtmToDomInBrowser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const doc = this.browserGlobals.documentRef();
      this.pushOnDataLayer({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const gtmScript = this.dom.createElement('script');

      gtmScript.setAttribute('id', 'GTMscript');
      gtmScript.setAttribute('async', 'true');
      gtmScript.setAttribute(
        'src',
        this.applyGtmQueryParams(
          this.config.gtm_resource_path
            ? this.config.gtm_resource_path
            : 'https://www.googletagmanager.com/gtm.js'
        )
      );
      gtmScript.addEventListener('load', () => {
        return resolve((this.isLoaded = true));
      });
      gtmScript.addEventListener('error', () => {
        return reject(false);
      });
      if (this.googleTagManagerCSPNonce) {
        gtmScript.setAttribute('nonce', this.googleTagManagerCSPNonce);
      }
      const head = this.browserGlobals
        .documentRef()
        .documentElement.querySelector('head');
      head.insertBefore(gtmScript, head.firstChild);
    });
  }

  private addGtmToDomInServer(): void {
    const ifrm = this.dom.createElement('iframe');
    ifrm.setAttribute(
      'src',
      this.applyGtmQueryParams('https://www.googletagmanager.com/ns.html')
    );
    ifrm.style.width = '0';
    ifrm.style.height = '0';
    ifrm.style.display = 'none';
    ifrm.style.visibility = 'hidden';

    const noscript = this.dom.createElement('noscript');
    noscript.appendChild(ifrm);

    const body = this.browserGlobals
      .documentRef()
      .documentElement.querySelector('body');

    body.insertBefore(noscript, body.firstChild);
    this.isLoaded = true;
  }

  public pushTag(item: object): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.checkForId()) {
        return resolve();
      }

      if (!this.isLoaded) {
        this.addGtmToDom()
          .then(() => {
            this.pushOnDataLayer(item);
            return resolve();
          })
          .catch(() => reject());
      } else {
        this.pushOnDataLayer(item);
        return resolve();
      }
    });
  }

  private applyGtmQueryParams(url: string): string {
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
