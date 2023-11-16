import { resolve } from 'path';
import { createPiletTemplateFactory, detectBundler, getPiralInstance } from '@smapiot/template-utils';
import {
  detectMode,
  detectSolidVersion,
  getBundlerFiles,
  getStandalonePackageJson,
  getStandardPackageJson,
} from './helpers';

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
  } else if (args.solidVersion !== detectSolidVersion(piralInstance)) {
    args.standalone = true;
  }

  const bundler = detectBundler(projectRoot);
  const solidVersion = `^${args.solidVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(bundler, details.cliVersion, solidVersion)
    : getStandardPackageJson(bundler, details.cliVersion, solidVersion);

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
      languages: ['ts'],
      name: 'tsconfig.json',
      target: '<root>/tsconfig.json',
    },
    ...getBundlerFiles(bundler),
  ];
});
