import { getProjectJson } from './utils';

export function detectBundler(root: string) {
  const projectJson = getProjectJson(root);
  const devDependencies = projectJson?.devDependencies;

  if (projectJson) {
    const bundlers = ['esbuild', 'webpack5', 'webpack', 'vite', 'parcel2', 'parcel', 'bun', 'rspack', 'rollup'];

    for (const bundler of bundlers) {
      const dependencyName = `piral-cli-${bundler}`;

      if (dependencyName in devDependencies) {
        return bundler;
      }
    }
  }

  // no piral-cli-... found - use fallback
  return 'xbuild';
}
