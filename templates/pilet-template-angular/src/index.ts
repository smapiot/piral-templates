import { resolve } from 'path';
import { createPiletTemplateFactory, getPiralInstance, log } from '@smapiot/template-utils';
import { detectMode, detectNgVersion, getStandalonePackageJson, getStandardPackageJson, isKnownVersion } from './helpers';

const root = resolve(__dirname, '..');

interface AngularPiletArgs {
  standalone: boolean;
  ngVersion: number;
}

export default createPiletTemplateFactory<AngularPiletArgs>(root, (projectRoot, args, details) => {
  const { sourceName } = args;
  const piralInstance = getPiralInstance(projectRoot, sourceName);

  if (typeof args.standalone === 'undefined') {
    args.standalone = detectMode(piralInstance);
  }

  if (typeof args.ngVersion !== 'number') {
    args.ngVersion = detectNgVersion(piralInstance);
  } else if (args.ngVersion !== detectNgVersion(piralInstance)) {
    args.standalone = true;
  }

  if (args.ngVersion < 9) {
    log('warn', `Angular version ${args.ngVersion} is not officially supported. It might not work.`);
  } else if (!isKnownVersion(args.ngVersion)) {
    log('warn', `Angular version ${args.ngVersion} is not known and therefore not yet officially supported. It might not work.`);
  }

  const ngVersion = `^${args.ngVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(details.cliVersion, ngVersion, args.ngVersion)
    : getStandardPackageJson(details.cliVersion, ngVersion, args.ngVersion);

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
      name: 'app.module.ts',
      target: '<src>/app/app.module.ts',
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
