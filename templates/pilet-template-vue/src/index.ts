import { resolve } from 'path';
import {
  createPiletTemplateFactory,
  detectBundler,
  getPiralInstance,
  PiletTemplateSource,
} from '@smapiot/template-utils';
import { detectMode, detectVueVersion, getBundlerFiles, getStandalonePackageJson, getStandardPackageJson } from './helpers';

const root = resolve(__dirname, '..');

interface VuePiletArgs {
  title: string;
  apiName: string;
  packageName: string;
  standalone: boolean;
  vueVersion: number;
}

export default createPiletTemplateFactory<VuePiletArgs>(root, (projectRoot, args, details) => {
  const { sourceName } = args;
  const piralInstance = getPiralInstance(projectRoot, sourceName);

  if (typeof args.standalone === 'undefined') {
    args.standalone = detectMode(piralInstance);
  }

  if (typeof args.vueVersion !== 'number') {
    args.vueVersion = detectVueVersion(piralInstance);
  } else if (args.vueVersion !== detectVueVersion(piralInstance)) {
    args.standalone = true;
  }

  const bundler = detectBundler(projectRoot);
  const vueVersion = `^${args.vueVersion}`;
  const isSfc = args.vueVersion >= 3;
  const packageJson = args.standalone
    ? getStandalonePackageJson(bundler, details.cliVersion, vueVersion, isSfc)
    : getStandardPackageJson(bundler, details.cliVersion, vueVersion, isSfc);

  if (isSfc) {
    args.apiName = 'fromVue3';
    args.packageName = 'piral-vue-3';
  } else {
    args.apiName = 'fromVue';
    args.packageName = 'piral-vue';
  }

  const files: Array<PiletTemplateSource> = [
    {
      languages: ['ts', 'js'],
      name: 'package.json',
      content: JSON.stringify(packageJson),
      target: '<root>/package.json',
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
    ...getBundlerFiles(bundler, isSfc),
  ];

  if (args.vueVersion >= 3) {
    files.push({
      languages: ['ts', 'js'],
      name: 'Page.vue',
      target: '<src>/Page.vue',
    });
  } else {
    files.push({
      languages: ['ts', 'js'],
      name: 'Page2.vue',
      target: '<src>/Page.vue',
    });
  }

  return files;
});
