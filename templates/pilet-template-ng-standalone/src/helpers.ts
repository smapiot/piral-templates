import { rxjsVersions, tsVersions, zoneVersions } from './versions';

export function isKnownVersion(majorNgVersion: number) {
  return typeof zoneVersions[majorNgVersion] !== 'undefined';
}

export function getPackageJson(cliVersion: string, ngVersion: string, majorNgVersion: number) {
  return {
    importmap: {
      imports: {
        '@angular/common': '',
        '@angular/compiler': '',
        '@angular/core': '',
        '@angular/platform-browser': '',
        '@angular/platform-browser-dynamic': '',
        '@angular/router': '',
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
      'core-js': '^3.19.0',
      rxjs: rxjsVersions[majorNgVersion] || '^7.4',
      'zone.js': zoneVersions[majorNgVersion] || '^0.14',
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
