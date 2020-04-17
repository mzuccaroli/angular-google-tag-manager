import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleTagManagerService {

  private isLoaded = false;
  private gtmId: string;
  private gtmAuth: string;
  private gtmPreview: string;

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    }
  };

  constructor(
    // private browserGlobals: BrowserGlobalsService,
    @Inject('googleTagManagerId') public googleTagManagerId: string,
    @Inject('googleTagManagerAuthKey') public googleTagManagerAuthKey: string,
    @Inject('googleTagManagerEviromentId') public googleTagManagerEviromentId: string,
  ) {
    this.gtmId = googleTagManagerId;
    this.gtmAuth = googleTagManagerAuthKey;
    this.gtmPreview = googleTagManagerEviromentId;
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
    const doc = this.browserGlobals.documentRef();
    this.pushOnDataLayer({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const gtmScript = doc.createElement('script');
    gtmScript.id = 'GTMscript';
    gtmScript.async = true;
    gtmScript.src = '//www.googletagmanager.com/gtm.js' + this.getGtmQueryParams();
    doc.head.insertBefore(gtmScript, doc.head.firstChild);

    const ifrm = doc.createElement('iframe');
    ifrm.setAttribute('src', '//www.googletagmanager.com/ns.html' + this.getGtmQueryParams());
    ifrm.style.width = '0';
    ifrm.style.height = '0';
    ifrm.style.display = 'none';
    ifrm.style.visibility = 'hidden';

    const noscript = doc.createElement('noscript');
    noscript.id = 'GTMiframe';
    noscript.appendChild(ifrm);

    doc.body.insertBefore(noscript, doc.body.firstChild);
    this.isLoaded = true;
  }

  public pushTag(item: object) {
    if (!this.isLoaded) {
      this.addGtmToDom();
    }
    this.pushOnDataLayer(item);
  }

  private getGtmQueryParams() {
    let url = '?id=' + this.gtmId;

    if (this.gtmAuth) {
      url += `&gtm_auth=${this.gtmAuth}`;
    }

    if (this.gtmPreview) {
      url += `&gtm_preview=${this.gtmPreview}`;
    }

    return url;
  }
}
