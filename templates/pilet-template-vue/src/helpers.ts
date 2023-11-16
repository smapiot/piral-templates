const vueNewLoaderVersion = '^17';
const vueOldLoaderVersion = '^15';

export function detectMode(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  return allDependencies['piral-vue'] === undefined || allDependencies['piral-vue-3'] === undefined;
}

export function detectVueVersion(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  const version = allDependencies['vue'] || '3.0.0';

  if (typeof version === 'string') {
    const result = /\d+/.exec(version);

    // Get major version
    if (result) {
      return +result[0];
    }
  }

  return 3;
}

export function getBundlerFiles(bundler: string, sfc: boolean) {
  const bundlers = {
    esbuild: [
      {
        languages: ['ts', 'js'],
        name: sfc ? 'esbuild.config.js' : 'esbuild2.config.js',
        target: '<root>/esbuild.config.js',
      },
    ],
    vite: [
      {
        languages: ['ts', 'js'],
        name: sfc ? 'vite.config.js' : 'vite2.config.js',
        target: '<root>/vite.config.js',
      },
    ],
    rspack: [
      {
        languages: ['ts', 'js'],
        name: 'rspack.config.js',
        target: '<root>/rspack.config.js',
      },
    ],
    webpack: [
      {
        languages: ['ts', 'js'],
        name: 'webpack.config.js',
        target: '<root>/webpack.config.js',
      },
    ],
    webpack5: [
      {
        languages: ['ts', 'js'],
        name: 'webpack.config.js',
        target: '<root>/webpack.config.js',
      },
    ],
    parcel: [],
    parcel2: [],
  };

  if (bundler in bundlers) {
    return bundlers[bundler];
  }

  return [];
}

export function getBundlerDependencies(bundler: string, sfc: boolean) {
  const bundlers = {
    esbuild: sfc
      ? {
          'esbuild-plugin-vue3': '^0.3.0',
        }
      : {
          'esbuild-vue': '^1.0.0',
        },
    rspack: {
      'vue-loader': sfc ? vueNewLoaderVersion : vueOldLoaderVersion,
    },
    webpack: {
      'vue-loader': sfc ? vueNewLoaderVersion : vueOldLoaderVersion,
    },
    webpack5: {
      'vue-loader': sfc ? vueNewLoaderVersion : vueOldLoaderVersion,
    },
    parcel: {},
    parcel2: {},
    vite: sfc
      ? {
          '@vitejs/plugin-vue': '^4.0.0',
        }
      : {
          '@vitejs/plugin-vue2': '^2.0.0',
        },
  };

  if (bundler in bundlers) {
    return bundlers[bundler];
  }

  return {};
}

export function getStandalonePackageJson(bundler: string, cliVersion: string, vueVersion: string, sfc: boolean) {
  const devDependencies = {
    vue: vueVersion,
    '@vue/compiler-sfc': vueVersion,
    ...getBundlerDependencies(bundler, sfc),
  };

  if (sfc) {
    devDependencies['piral-vue-3'] = cliVersion;
  } else {
    devDependencies['piral-vue'] = cliVersion;
  }

  return {
    importmap: {
      imports: {
        vue: 'vue',
      },
    },
    devDependencies,
  };
}

export function getStandardPackageJson(bundler: string, cliVersion: string, vueVersion: string, sfc: boolean) {
  const devDependencies = {
    vue: vueVersion,
    '@vue/compiler-sfc': vueVersion,
    ...getBundlerDependencies(bundler, sfc),
  };

  if (sfc) {
    devDependencies['piral-vue-3'] = cliVersion;
  } else {
    devDependencies['piral-vue'] = cliVersion;
  }

  return {
    devDependencies,
  };
}
