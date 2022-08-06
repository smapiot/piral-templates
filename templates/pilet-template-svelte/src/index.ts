import { resolve } from 'path';
import { createPiletTemplateFactory, getPiralInstance } from '@smapiot/template-utils';
import { detectMode, detectSvelteVersion, getStandalonePackageJson, getStandardPackageJson } from './helpers';

const root = resolve(__dirname, '..');

interface SveltePiletArgs {
  title: string;
  standalone: boolean;
  svelteVersion: number;
}

export default createPiletTemplateFactory<SveltePiletArgs>(root, (projectRoot, args, details) => {
  const { sourceName } = args;
  const piralInstance = getPiralInstance(projectRoot, sourceName);

  if (typeof args.standalone === 'undefined') {
    args.standalone = detectMode(piralInstance);
  }

  if (typeof args.svelteVersion !== 'number') {
    args.svelteVersion = detectSvelteVersion(piralInstance);
  }

  const svelteVersion = `^${args.svelteVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(details.cliVersion, svelteVersion)
    : getStandardPackageJson(details.cliVersion, svelteVersion);

  return [
    {
      languages: ['ts', 'js'],
      name: 'package.json',
      content: JSON.stringify(packageJson),
      target: '<root>/package.json',
    },
    {
      languages: ['ts', 'js'],
      name: 'webpack.config.js',
      target: '<root>/webpack.config.js',
    },
    {
      languages: ['ts', 'js'],
      name: 'Page.svelte',
      target: '<src>/Page.svelte',
    },
    {
      languages: ['js'],
      name: 'index.jsx',
      target: '<src>/index.jsx',
    },
    {
      languages: ['ts'],
      name: 'tsconfig.json',
      target: '<root>/tsconfig.json',
    },
  ];
});
