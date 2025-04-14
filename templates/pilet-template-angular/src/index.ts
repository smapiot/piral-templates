import { resolve } from 'path';
import { createPiletTemplateFactory, getPiralInstance, log, PiletTemplateSource } from '@smapiot/template-utils';
import {
  detectMode,
  detectNgVersion,
  getStandalonePackageJson,
  getStandardPackageJson,
  isKnownVersion,
} from './helpers';

const root = resolve(__dirname, '..');

interface AngularPiletArgs {
  standalone: boolean;
  ngVersion: number;
  ngStandalone: boolean;
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
    log(
      'warn',
      `Angular version ${args.ngVersion} is not known and therefore not yet officially supported. It might not work.`,
    );
  }

  if (args.ngVersion < 17) {
    args.ngStandalone = false;
  }

  if (typeof args.ngStandalone === 'undefined') {
    args.ngStandalone = args.ngVersion > 18;
  }

  const ngVersion = `^${args.ngVersion}`;
  const packageJson = args.standalone
    ? getStandalonePackageJson(details.cliVersion, ngVersion, args.ngVersion)
    : getStandardPackageJson(details.cliVersion, ngVersion, args.ngVersion);

  const templates: Array<PiletTemplateSource> = [
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

  if (args.ngStandalone) {
    templates.push(
      {
        languages: ['ts'],
        name: 'index.standalone.tsx',
        target: '<src>/index.tsx',
      },
    );
  } else {
    templates.push(
      {
        languages: ['ts'],
        name: 'index.tsx',
        target: '<src>/index.tsx',
      },
      {
        languages: ['ts'],
        name: 'app.module.ts',
        target: '<src>/app/app.module.ts',
      },
    );
  }

  return templates;
});
