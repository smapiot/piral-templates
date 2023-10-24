import { rxjsVersions, tsVersions, zoneVersions } from './versions';

export function detectMode(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  return allDependencies['piral-ng'] === undefined;
}

export function detectNgVersion(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  const version = allDependencies['@angular/core'] || '16.0.0';

  if (typeof version === 'string') {
    const result = /\d+/.exec(version);

    // Get major version
    if (result) {
      return +result[0];
    }
  }

  return 16;
}

export function isKnownVersion(majorNgVersion: number) {
  return typeof zoneVersions[majorNgVersion] !== 'undefined';
}

export function getStandalonePackageJson(cliVersion: string, ngVersion: string, majorNgVersion: number) {
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
      'core-js': '^3.19.0',
      rxjs: rxjsVersions[majorNgVersion] || '^7.4',
      'zone.js': zoneVersions[majorNgVersion] || '^0.13',
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

export function getStandardPackageJson(cliVersion: string, ngVersion: string, majorNgVersion: number) {
  return {
    devDependencies: {
      '@angular/compiler-cli': ngVersion,
      '@ngtools/webpack': ngVersion,
      'copy-webpack-plugin': '^10',
      'html-loader': '^3',
      'to-string-loader': '^1',
      'piral-ng': cliVersion,
      typescript: tsVersions[majorNgVersion] || 'latest',
    },
  };
}
