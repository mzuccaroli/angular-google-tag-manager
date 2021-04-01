# Angular Google Tag Manager Service

**Please note: this is a temporary clone of mzuccaroli's [angular-google-tag-manager](https://www.npmjs.com/package/angular-google-tag-manager) library, differing only in that it contains a code change which is currently in an [open pull request](https://github.com/mzuccaroli/angular-google-tag-manager/pull/57). The following is the text of the original library's readme file:**

A service library for integrate google tag manager in your angular project
This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
For more info see this [how to install google tag manager article](https://itnext.io/how-to-add-google-tag-manager-to-an-angular-application-fc68624386e2)

## Getting Started

After installing it you need to provide your GTM id in app.module.ts

```
    providers: [
        ...
        {provide: 'googleTagManagerId',  useValue: YOUR_GTM_ID}
    ],
```

Or use the module's `forRoot` method

```
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

imports: [
    ...
    GoogleTagManagerModule.forRoot({
      id: YOUR_GTM_ID,
    })
]
```

inject the gtmService in your controller

```
constructor(
        ...
        private gtmService: GoogleTagManagerService,
    ) { }
```

then you can start pushing events on your gtm

```
 this.router.events.forEach(item => {
            if (item instanceof NavigationEnd) {
                const gtmTag = {
                    event: 'page',
                    pageName: item.url
                };

                this.gtmService.pushTag(gtmTag);
            }
        });
```

if you want to recive tags without pushing events simply call the function to enable it

```
    this.gtmService.addGtmToDom();
```

### Installing

In your Angular project run

```
npm i --save  angular-google-tag-manager
```

### Custom configuration and GTM environments

You can pass _gtm_preview_ and _gtm_auth_ optional variables to your GTM by providing them in app.module.ts

```
    providers: [
        ...
        {provide: 'googleTagManagerId',  useValue: YOUR_GTM_ID},
        {provide: 'googleTagManagerAuth',  useValue: YOUR_GTM_AUTH},
        {provide: 'googleTagManagerPreview',  useValue: YOUR_GTM_ENV}
    ],
```

Or using `forRoot`

```
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

imports: [
    ...
    GoogleTagManagerModule.forRoot({
      id: YOUR_GTM_ID,
      gtm_auth: YOUR_GTM_AUTH,
      gtm_preview: YOUR_GTM_ENV
    })
]
```

## Authors

- **Marco Zuccaroli** - _Initial work_ - [Marco Zuccaroli](https://github.com/mzuccaroli)

See also the list of [contributors](https://github.com/mzuccaroli/angular-google-tag-manager/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

- Thanks to PurpleBooth for the [Readme Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
