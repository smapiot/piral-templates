# Piral Templates Changelog

## 1.0.17 (November 22, 2025)

- Updated `angular` and `ng-standalone` templates to use Angular 20 by default
- Added support for Angular 21

## 1.0.16 (August 7, 2025)

- Fixed syntax error in `@smapiot/pilet-template-ng-standalone` (#4) by @pranav-hsg

## 1.0.15 (June 2, 2025)

- Improved `angular` template with support for Angular 20

## 1.0.14 (April 14, 2025)

- Fixed issue with undefined `ngStandalone` option in the `angular` template
- Updated `ng-standalone` template to behave like `angular` template with `ngStandalone` option
- Updated `angular` and `ng-standalone` templates to use Angular 18 by default
- Added `blazor` template for pilets

## 1.0.13 (April 11, 2025)

- Added option `ngStandalone` to the `angular` template

## 1.0.12 (April 4, 2025)

- Improved `angular` template with support for Angular 18
- Improved `angular` template with support for Angular 19
- Added override switch to utils (#2)

## 1.0.11 (December 25, 2024)

- Added *.codegen* files to the assets declaration

## 1.0.10 (December 3, 2024)

- Added *assets.d.ts* for TypeScript projects

## 1.0.9 (May 10, 2024)

- Changed `moduleResolution` in *tsconfig.json* to `Bundler`
- Added new template for standalone Angular (`ng-standalone`)

## 1.0.8 (May 2, 2024)

- Added support for Angular CLI in `angular` template

## 1.0.7 (November 24, 2023)

- Improved `angular` template with support for Angular 17
- Improved `vue` template to respect different bundlers
- Updated default Angular version to 17
- Added support for `piral-cli-vite` to the solid template
- Added `detectBundler` helper to the `@smapiot/template-utils` package

## 1.0.6 (November 16, 2023)

- Improved template for `piral-solid` to respect different bundlers

## 1.0.5 (November 8, 2023)

- Fixed issue with version of `vue-loader` (#1)

## 1.0.4 (October 24, 2023)

- Fixed reverse warning with Angular versions
- Updated default Angular version to 16

## 1.0.3 (September 27, 2023)

- Added warning for non-supported Angular version
- Updated Angular template with piral-ng-common reference

## 1.0.2 (September 26, 2023)

- Updated default version of Angular
- Improved routing in Angular template

## 1.0.1 (June 27, 2023)

- Fixed condition checking on the templates

## 1.0.0 (June 12, 2023)

- Updated for Piral 1.0.0

## 0.15.6 (April 14, 2023)

- Fixed used version of `typescript` (and libs) in `angular` template

## 0.15.5 (April 11, 2023)

- Improved `vue` template with enhanced support for Vue 2
- Improved detection of standalone mode also to support using different versions
- Improved templates by adding distributed sharing to standalone mode

## 0.15.4 (April 10, 2023)

- Fixed missing root module for `svelte` template
- Added `vue` template for pilets
- Added `solid` template for pilets

## 0.15.3 (December 25, 2022)

- Fixed wrong relative paths using `--target`

## 0.15.2 (December 9, 2022)

- Fixed template version comparison w.r.t. preview versions
- Fixed `src` being an absolute path in `tsconfig.json`

## 0.15.1 (November 22, 2022)

- Fixed issue when no plugins are integrated
- Extended `angular` template with menu component

## 0.15.0 (November 17, 2022)

- Moved templates to dedicated repository
- Added `angular` template for pilets
- Added `svelte` template for pilets
