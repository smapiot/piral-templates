export function detectMode(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  return allDependencies['piral-solid'] === undefined;
}

export function detectSolidVersion(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  const version = allDependencies['solid-js'] || '1.0.0';

  if (typeof version === 'string') {
    const result = /\d+/.exec(version);

    // Get major version
    if (result) {
      return +result[0];
    }
  }

  return 1;
}

export function getStandalonePackageJson(cliVersion: string, solidVersion: string) {
  return {
    importmap: {
      imports: {
        'solid-js': 'solid-js',
        'solid-js/web': 'solid-js/web',
      },
    },
    devDependencies: {
      'babel-preset-solid': solidVersion,
      'piral-solid': cliVersion,
      'solid-js': solidVersion,
    },
  };
}

export function getStandardPackageJson(_cliVersion: string, solidVersion: string) {
  return {
    devDependencies: {
      'babel-preset-solid': solidVersion,
      'solid-js': solidVersion,
    },
  };
}
