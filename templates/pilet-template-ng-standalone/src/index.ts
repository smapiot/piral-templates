import { resolve } from 'path';
import { createPiletTemplateFactory, log } from '@smapiot/template-utils';
import { getPackageJson, isKnownVersion } from './helpers';

const root = resolve(__dirname, '..');

interface AngularPiletArgs {
  standalone: boolean;
  ngVersion: number;
}

export default createPiletTemplateFactory<AngularPiletArgs>(root, (_projectRoot, args, details) => {
  if (args.ngVersion < 17) {
    log('error', `Angular version ${args.ngVersion} is not supported. Minimum version is 17.`);
    throw new Error('Failed to apply template.');
  } else if (!isKnownVersion(args.ngVersion)) {
    log('warn', `Angular version ${args.ngVersion} is not known and therefore not yet officially supported. It might not work.`);
  }

  // parseInt actually ignores remains, e.g., 1.5.5-beta.27 will still be [1,5,5]; so we are fine here
  const [major, minor, patch] = details.cliVersion.split('.').map(n => parseInt(n));

  // test if we are "below" 1.5.5
  if (major < 1 || (major === 1 && minor < 5) || (major === 1 && minor === 5 && patch < 5)) {
    log('error', `Piral version ${details.cliVersion} is not supported. You need at least version 1.5.5.`);
    throw new Error('Failed to apply template.');
  }

  const ngVersion = `^${args.ngVersion}`;
  const packageJson = getPackageJson(details.cliVersion, ngVersion, args.ngVersion);

  return [
    {
      languages: ['ts', 'js'],
      name: 'package.json',
      content: JSON.stringify(packageJson),
      target: '<root>/package.json',
    },
    {
      languages: ['ts', 'js'],
      name: 'angular.json',
      target: '<root>/angular.json',
    },
    {
      languages: ['ts', 'js'],
      name: 'webpack.config.js',
      target: '<root>/webpack.config.js',
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
      name: 'page.component.html',
      target: '<src>/app/page.component.html',
    },
    {
      languages: ['ts'],
      name: 'page.component.css',
      target: '<src>/app/page.component.css',
    },
    {
      languages: ['ts'],
      name: 'page.component.ts',
      target: '<src>/app/page.component.ts',
    },
    {
      languages: ['ts'],
      name: 'menu.component.html',
      target: '<src>/app/menu.component.html',
    },
    {
      languages: ['ts'],
      name: 'menu.component.ts',
      target: '<src>/app/menu.component.ts',
    },
    {
      languages: ['ts'],
      name: 'tsconfig.json',
      target: '<root>/tsconfig.json',
    },
  ];
});
