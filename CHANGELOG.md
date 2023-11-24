# Piral Templates Changelog

## 1.0.7 (tbd)

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
