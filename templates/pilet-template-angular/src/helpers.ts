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
  const version = allDependencies['@angular/core'] || '14.0.0';

  if (typeof version === 'string') {
    const result = /\d+/.exec(version);

    // Get major version
    if (result) {
      return +result[0];
    }
  }

  return 14;
}

export function getStandalonePackageJson(cliVersion: string, ngVersion: string) {
  return {
    importmap: {
      imports: {
        '@angular/animations': '.',
        '@angular/cli': '.',
        '@angular/common': '.',
        '@angular/compiler': '.',
        '@angular/core': '.',
        '@angular/forms': '.',
        '@angular/platform-browser': '.',
        '@angular/platform-browser-dynamic': '.',
        '@angular/router': '.',
      },
    },
    dependencies: {
      '@angular/animations': ngVersion,
      '@angular/cli': ngVersion,
      '@angular/common': ngVersion,
      '@angular/compiler': ngVersion,
      '@angular/core': ngVersion,
      '@angular/forms': ngVersion,
      '@angular/platform-browser': ngVersion,
      '@angular/platform-browser-dynamic': ngVersion,
      '@angular/router': ngVersion,
      'piral-ng': cliVersion,
      rxjs: '~7.4',
      'zone.js': '~0.11',
    },
    devDependencies: {
      '@angular/compiler-cli': ngVersion,
      '@ngtools/webpack': ngVersion,
      'copy-webpack-plugin': '^10',
      'html-loader': '^3',
      'to-string-loader': '^1',
    },
  };
}

export function getStandardPackageJson(cliVersion: string, ngVersion: string) {
  return {
    devDependencies: {
      '@angular/compiler-cli': ngVersion,
      '@ngtools/webpack': ngVersion,
      'copy-webpack-plugin': '^10',
      'html-loader': '^3',
      'to-string-loader': '^1',
      'piral-ng': cliVersion,
    },
  };
}
