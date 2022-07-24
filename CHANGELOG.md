# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.1] - 2022-07-24

### Added
### Changed
- Fix on ReferenceError
### Removed

## [1.6.0] - 2022-06-25

### Added
- Angular 14 support
### Changed
### Removed


## [1.5.1] - 2022-06-02

### Added
- use APP_INITIALIZER token to set config dynamically: https://github.com/mzuccaroli/angular-google-tag-manager/issues/135
### Changed
- Bump dependencies

## [1.5.0] - 2022-01-03

### Added
### Changed
- Updated all dependencies to latest version, or close to latest
- Replaced tilde versioning with hat versioning (Tilde versioning of Angular is too strict #108)
- Exceptions to the above: zone.js still in version 0.x and typescript is a special case for the Angular compiler
- Removed tslint, as it no longer has any effect: executing npm run lint would state there was no linter installed
- Removed tsickle and the closure compiler option, as they do not support any Typescript above 4.3
- Updated build:prod script for Angular 13 standards
### Removed

## [1.4.4] - 2021-11-15

### Added
### Changed
- package.json fix
### Removed

## [1.4.3] - 2021-11-13

### Added
- Angular 13 support
### Changed
### Removed

## [1.4.2] - 2021-06-19

### Added
- Optional CSP nonce 
### Changed
### Removed

## [1.4.1] - 2021-06-05

### Added
### Changed
- Typo fix
### Removed

## [1.4.0] - 2021-06-04

### Added
- Angular 12 support
### Changed
### Removed

## [1.3.2] - 2021-04-30

### Added
- config parameter for custom gtm.js resource path
### Changed
### Removed

## [1.3.1] - 2021-04-01

### Added
### Changed
- Fix on first event push twice
### Removed

## [1.3.0] - 2021-02-07

### Added
### Changed
- Angular 11 support
### Removed

## [1.2.4] - 2020‑12‑08

### Added
### Changed
### Removed
- Remove noscript iframe
## [1.2.3] - 2020‑10‑27

### Added
### Changed
- force use of https for google scripts
### Removed

## [1.2.2] - 2020‑09‑20

### Added
### Changed
- support for Angular 10 strict mode
### Removed

## [1.2.1] - 2020‑09‑20

### Added
- for root support
### Changed
### Removed

## [1.2.0] - 2020‑09‑20

### Added
### Changed
- update to angular 10
### Removed

## [1.1.4] - 2020‑04‑23

### Added
### Changed
- dependencies update
### Removed

## [1.1.3] - 2020‑04‑23

### Added
### Changed
- readme update
### Removed

## [1.1.2] - 2020‑04‑22

### Added
- gtm_auth support
- gtm_preview support
### Changed
### Removed

## [1.1.1] - 2020‑01‑20

### Added
### Changed
- readme update
### Removed

## [1.1.0] - 2020‑01‑20

### Added
### Changed
- update requirements to angular 8
### Removed
- browser-globals dependency

## [1.0.1] - 2020‑01‑14

### Added
### Changed
- readme updated
### Removed

## [1.0.0] - 2020‑01‑14

### Added
- demo application
### Changed
### Removed

## [0.0.2] - 2020‑01‑13

### Added
### Changed
- public repo tag
### Removed

## [0.0.1] - 2020‑01‑13

### Added
- changelog file
### Changed
- performed npm audit fix
- readme update
### Removed

## [0.0.0] - 2019‑05‑17

### Added
- First implementation
### Changed
### Removed

