# Angular Google Tag Manager Service

A service library for integrate google tag manager in your angular project
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Getting Started

After installing it you need to provide your GTM id in app.module.ts 

```
    providers: [
        ...
        {provide: 'googleTagManagerId',  useValue: YOUR_GTM_ID}
    ],
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
npm i -save  angular-google-tag-manager
```

## Authors

* **Marco Zuccaroli** - *Initial work* - [Marco Zuccaroli](https://github.com/mzuccaroli)

See also the list of [contributors](https://github.com/mzuccaroli/angular-browser-globals/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License

## Acknowledgments

* Thanks to [PurpleBooth](https://github.com/PurpleBooth) for the [Readme Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) 
