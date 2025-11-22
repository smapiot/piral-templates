import { rxjsVersions, tsVersions, zoneVersions } from './versions';

export function isKnownVersion(majorNgVersion: number) {
  return typeof zoneVersions[majorNgVersion] !== 'undefined';
}

export function getPackageJson(cliVersion: string, ngVersion: string, majorNgVersion: number) {
  const zoneVersion = zoneVersions[majorNgVersion];
  const extraDeps = typeof zoneVersion === 'string' ? { 'zone.js': zoneVersion } : {};

  return {
    importmap: {
      imports: {
        '@angular/common': '',
        '@angular/compiler': '',
        '@angular/core': '',
        '@angular/platform-browser': '',
        '@angular/platform-browser-dynamic': '',
        '@angular/router': '',
        'piral-ng-common': '',
      },
    },
    dependencies: {
      '@angular/common': ngVersion,
      '@angular/compiler': ngVersion,
      '@angular/core': ngVersion,
      '@angular/platform-browser': ngVersion,
      '@angular/platform-browser-dynamic': ngVersion,
      '@angular/router': ngVersion,
      'piral-ng': cliVersion,
      'piral-ng-common': ngVersion,
      'core-js': '^3',
      rxjs: rxjsVersions[majorNgVersion] || '^7.4',
      ...extraDeps,
    },
    devDependencies: {
      '@angular/compiler-cli': ngVersion,
      '@angular/cli': ngVersion,
      '@ngtools/webpack': ngVersion,
      'copy-webpack-plugin': '^10',
      'html-loader': '^3',
      'to-string-loader': '^1',
      typescript: tsVersions[majorNgVersion] || 'latest',
    },
  };
}
