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

export function getStandalonePackageJson(cliVersion: string, vueVersion: string, sfc: boolean) {
  const devDependencies = {
    vue: vueVersion,
  };

  if (sfc) {
    devDependencies['piral-vue-3'] = cliVersion;
    devDependencies['@vue/compiler-sfc'] = vueVersion;
    devDependencies['vue-loader'] = 'latest';
  } else {
    devDependencies['piral-vue'] = cliVersion;
  }

  return {
    devDependencies,
  };
}

export function getStandardPackageJson(cliVersion: string, vueVersion: string, sfc: boolean) {
  const devDependencies = {
    vue: vueVersion,
  };

  if (sfc) {
    devDependencies['piral-vue-3'] = cliVersion;
    devDependencies['@vue/compiler-sfc'] = vueVersion;
    devDependencies['vue-loader'] = 'latest';
  } else {
  }

  return {
    devDependencies,
  };
}
