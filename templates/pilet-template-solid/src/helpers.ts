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

export function getBundlerFiles(bundler: string) {
  const bundlers = {
    esbuild: [
      {
        languages: ['ts', 'js'],
        name: 'esbuild.config.js',
        target: '<root>/esbuild.config.js',
      },
    ],
    vite: [
      {
        languages: ['ts', 'js'],
        name: 'vite.config.js',
        target: '<root>/vite.config.js',
      },
    ],
    rspack: [
      {
        languages: ['ts', 'js'],
        name: 'babelrc',
        target: '<root>/.babelrc',
      },
    ],
    webpack: [
      {
        languages: ['ts', 'js'],
        name: 'babelrc',
        target: '<root>/.babelrc',
      },
    ],
    webpack5: [
      {
        languages: ['ts', 'js'],
        name: 'babelrc',
        target: '<root>/.babelrc',
      },
    ],
    parcel: [
      {
        languages: ['ts', 'js'],
        name: 'babelrc',
        target: '<root>/.babelrc',
      },
    ],
    parcel2: [
      {
        languages: ['ts', 'js'],
        name: 'babelrc',
        target: '<root>/.babelrc',
      },
    ],
  };

  if (bundler in bundlers) {
    return bundlers[bundler];
  }

  return [];
}

export function getBundlerDependencies(bundler: string, solidVersion: string) {
  const bundlers = {
    esbuild: {
      'esbuild-plugin-solid': '^0.5.0',
    },
    rspack: {
      'babel-preset-solid': solidVersion,
    },
    webpack: {
      'babel-preset-solid': solidVersion,
    },
    webpack5: {
      'babel-preset-solid': solidVersion,
    },
    parcel: {
      'babel-preset-solid': solidVersion,
    },
    parcel2: {
      'babel-preset-solid': solidVersion,
    },
    vite: {
      'vite-plugin-solid': '^2.0.0',
    },
  };

  if (bundler in bundlers) {
    return bundlers[bundler];
  }

  return {};
}

export function getStandalonePackageJson(bundler: string, cliVersion: string, solidVersion: string) {
  return {
    importmap: {
      imports: {
        'solid-js': 'solid-js',
        'solid-js/web': 'solid-js/web',
      },
    },
    devDependencies: {
      ...getBundlerDependencies(bundler, solidVersion),
      'piral-solid': cliVersion,
      'solid-js': solidVersion,
    },
  };
}

export function getStandardPackageJson(bundler: string, _cliVersion: string, solidVersion: string) {
  return {
    devDependencies: {
      ...getBundlerDependencies(bundler, solidVersion),
      'solid-js': solidVersion,
    },
  };
}
