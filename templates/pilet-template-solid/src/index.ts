import { resolve } from 'path';
import { createPiletTemplateFactory, getPiralInstance } from '@smapiot/template-utils';
import { detectMode, detectSolidVersion, getStandalonePackageJson, getStandardPackageJson } from './helpers';

const root = resolve(__dirname, '..');

interface SolidPiletArgs {
  title: string;
  standalone: boolean;
  solidVersion: number;
}

export default createPiletTemplateFactory<SolidPiletArgs>(root, (projectRoot, args, details) => {
  const { sourceName } = args;
  const piralInstance = getPiralInstance(projectRoot, sourceName);

  if (typeof args.standalone === 'undefined') {
    args.standalone = detectMode(piralInstance);
  }

  if (typeof args.solidVersion !== 'number') {
    args.solidVersion = detectSolidVersion(piralInstance);
  }

  const solidVersion = `^${args.solidVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(details.cliVersion, solidVersion)
    : getStandardPackageJson(details.cliVersion, solidVersion);

  return [
    {
      languages: ['ts', 'js'],
      name: 'package.json',
      content: JSON.stringify(packageJson),
      target: '<root>/package.json',
    },
    {
      languages: ['ts'],
      name: 'Page.tsx',
      target: '<src>/Page.tsx',
    },
    {
      languages: ['js'],
      name: 'Page.jsx',
      target: '<src>/Page.jsx',
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
      languages: ['ts', 'js'],
      name: 'babelrc',
      target: '<root>/.babelrc',
    },
    {
      languages: ['ts'],
      name: 'tsconfig.json',
      target: '<root>/tsconfig.json',
    },
  ];
});
