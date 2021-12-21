import { Inject, Injectable, Optional } from '@angular/core';
import { GoogleTagManagerConfig } from './google-tag-manager-config';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private isLoaded = false;

  private isLoading = false;

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
    public googleTagManagerPreview: string,
    @Optional()
    @Inject('googleTagManagerResourcePath')
    public googleTagManagerResourcePath: string,
    @Optional()
    @Inject('googleTagManagerCSPNonce')
    public googleTagManagerCSPNonce: string
  ) {
    if (this.config == null) {
      this.config = { id: null };
    }

    this.config = {
      ...this.config,
      id: googleTagManagerId || this.config.id,
      gtm_auth: googleTagManagerAuth || this.config.gtm_auth,
      gtm_preview: googleTagManagerPreview || this.config.gtm_preview,
      gtm_resource_path: googleTagManagerResourcePath || this.config.gtm_resource_path
    };
    if (this.config.id == null) {
      throw new Error('Google tag manager ID not provided.');
    }
  }

  public getDataLayer(): any[] {
    const window = this.browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }

  private pushOnDataLayer(obj: object): void {
    const dataLayer = this.getDataLayer();
    dataLayer.push(obj);
  }

  public addGtmToDom(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve(this.isLoaded);
      }

      if (this.isLoading) {
        const waiter = setInterval(() => {
          if (!this.isLoading) {
            clearInterval(waiter);
            return resolve(this.isLoaded);
          }
        }, 20);
      } else {
        this.isLoading = true;
        const doc = this.browserGlobals.documentRef();
        this.pushOnDataLayer({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });

        const gtmScript = doc.createElement('script');
        gtmScript.id = 'GTMscript';
        gtmScript.async = true;
        gtmScript.src = this.applyGtmQueryParams(
          this.config.gtm_resource_path ? this.config.gtm_resource_path : 'https://www.googletagmanager.com/gtm.js'
        );
        gtmScript.addEventListener('load', () => {
          this.isLoading = false;
          return resolve(this.isLoaded = true);
        });
        gtmScript.addEventListener('error', () => {
          return reject(false);
        });
        if (this.googleTagManagerCSPNonce) {
          gtmScript.setAttribute('nonce', this.googleTagManagerCSPNonce);
        }
        doc.head.insertBefore(gtmScript, doc.head.firstChild);
      }      
    });
  }

  public pushTag(item: object): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.isLoaded) {
        this.addGtmToDom().then(() => {
          this.pushOnDataLayer(item);
          return resolve();
        }).catch(() => reject());
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
