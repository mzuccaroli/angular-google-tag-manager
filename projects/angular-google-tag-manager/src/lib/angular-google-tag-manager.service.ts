import { Inject, Injectable, Optional } from '@angular/core';
import { GoogleTagManagerConfiguration } from './angular-google-tag-manager-config.service';

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
    @Inject(GoogleTagManagerConfiguration)
    public googleTagManagerConfiguration: GoogleTagManagerConfiguration,
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
    let config = this.googleTagManagerConfiguration?.get();
    if (config == null) {
      config = { id: null };
    }

    config = {
      ...config,
      id: googleTagManagerId || config.id,
      gtm_auth: googleTagManagerAuth || config.gtm_auth,
      gtm_preview: googleTagManagerPreview || config.gtm_preview,
      gtm_resource_path:
        googleTagManagerResourcePath || config.gtm_resource_path,
    };
    if (config.id == null) {
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
      const doc = this.browserGlobals.documentRef();
      this.pushOnDataLayer({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const config = this.googleTagManagerConfiguration.get();

      const gtmScript = doc.createElement('script');
      gtmScript.id = 'GTMscript';
      gtmScript.async = true;
      gtmScript.src = this.applyGtmQueryParams(
        config.gtm_resource_path
          ? config.gtm_resource_path
          : 'https://www.googletagmanager.com/gtm.js'
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
      doc.head.insertBefore(gtmScript, doc.head.firstChild);
    });
  }

  public pushTag(item: object): Promise<void> {
    return new Promise<void>((resolve, reject) => {
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
    const config = this.googleTagManagerConfiguration.get();
    if (url.indexOf('?') === -1) {
      url += '?';
    }

    return (
      url +
      Object.keys(config)
        .filter((k) => config[k])
        .map((k) => `${k}=${config[k]}`)
        .join('&')
    );
  }
}
