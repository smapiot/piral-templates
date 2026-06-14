import { resolve } from 'path';
import { createPiletTemplateFactory, getPiralInstance, PiletTemplateSource } from '@smapiot/template-utils';
import { detectMode, detectSvelteVersion, getStandalonePackageJson, getStandardPackageJson } from './helpers';

const root = resolve(__dirname, '..');

interface SveltePiletArgs {
  title: string;
  standalone: boolean;
  svelteVersion: number;
  agents: boolean;
}

export default createPiletTemplateFactory<SveltePiletArgs>(root, (projectRoot, args, details) => {
  const { sourceName, agents } = args;
  const piralInstance = getPiralInstance(projectRoot, sourceName);

  if (typeof args.standalone === 'undefined') {
    args.standalone = detectMode(piralInstance);
  }

  if (typeof args.svelteVersion !== 'number') {
    args.svelteVersion = detectSvelteVersion(piralInstance);
  } else if (args.svelteVersion !== detectSvelteVersion(piralInstance)) {
    args.standalone = true;
  }

  const svelteVersion = `^${args.svelteVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(details.cliVersion, svelteVersion)
    : getStandardPackageJson(details.cliVersion, svelteVersion);

  const sources: Array<PiletTemplateSource> = [
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
      languages: ['ts'],
      name: 'index.tsx',
      target: '<src>/index.tsx',
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

  if (agents) {
    sources.push({
      languages: ['js', 'ts'],
      name: 'AGENTS.md',
      target: '<root>/AGENTS.md',
    });
  }

  return sources;
});
