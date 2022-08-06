export function detectMode(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  return allDependencies['piral-svelte'] === undefined;
}

export function detectSvelteVersion(piralInstance: { details: any }) {
  const dependencies = piralInstance?.details?.dependencies || {};
  const devDependencies = piralInstance?.details?.devDependencies || {};
  const allDependencies = { ...devDependencies, ...dependencies };
  const version = allDependencies['svelte'] || '3.0.0';

  if (typeof version === 'string') {
    const result = /\d+/.exec(version);

    // Get major version
    if (result) {
      return +result[0];
    }
  }

  return 3;
}

export function getStandalonePackageJson(cliVersion: string, svelteVersion: string) {
  return {
    devDependencies: {
      'piral-svelte': cliVersion,
      'svelte': svelteVersion,
      'svelte-loader': '^3',
    },
  };
}

export function getStandardPackageJson(cliVersion: string, svelteVersion: string) {
  return {
    devDependencies: {
      'piral-svelte': cliVersion,
      'svelte': svelteVersion,
      'svelte-loader': '^3',
    },
  };
}
