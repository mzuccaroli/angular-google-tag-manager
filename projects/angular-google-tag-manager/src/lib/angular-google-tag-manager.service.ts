import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GoogleTagManagerService {

    private isLoaded = false;
    private gtmId: string;

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
    ) {
        this.gtmId = googleTagManagerId;
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
        gtmScript.src = '//www.googletagmanager.com/gtm.js?id=' + this.gtmId;
        doc.head.insertBefore(gtmScript, doc.head.firstChild);

        const ifrm = doc.createElement('iframe');
        ifrm.setAttribute('src', '//www.googletagmanager.com/ns.html?id=' + this.gtmId);
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

}
