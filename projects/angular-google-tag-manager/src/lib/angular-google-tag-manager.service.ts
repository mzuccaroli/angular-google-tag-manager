import { Inject, Injectable, Optional } from '@angular/core';

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
        @Inject('googleTagManagerId') public googleTagManagerId: string,
        @Optional() @Inject('googleTagManagerAuth') public googleTagManagerAuth: string,
        @Optional() @Inject('googleTagManagerPreview') public googleTagManagerPreview: string
    ) {
        this.gtmId = googleTagManagerId;
        this.gtmAuth = googleTagManagerAuth;
        this.gtmPreview = googleTagManagerPreview;
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
        gtmScript.src = this.applyGtmQueryParams(
            '//www.googletagmanager.com/gtm.js'
        );
        doc.head.insertBefore(gtmScript, doc.head.firstChild);

        const ifrm = doc.createElement('iframe');
        ifrm.setAttribute(
            'src',
            this.applyGtmQueryParams('//www.googletagmanager.com/ns.html')
        );
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

    private applyGtmQueryParams(url: string) {
        const params: string[] = [`id=${this.gtmId}`];

        if (this.gtmAuth) {
            params.push(`gtm_auth=${this.gtmAuth}`);
        }

        if (this.gtmPreview) {
            params.push(`gtm_preview=${this.gtmPreview}`);
        }

        if (url.indexOf('?') === -1) {
            url += '?';
        }

        return url + params.join('&');
    }
}
