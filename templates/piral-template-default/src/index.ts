import { resolve } from 'path';
import { createPiralTemplateFactory } from '@smapiot/template-utils';

const root = resolve(__dirname, '..');

export default createPiralTemplateFactory(root, [
  {
    name: 'backend.js',
    frameworks: ['piral-base', 'piral-core', 'piral'],
    target: '<mocks>/backend.js',
    languages: ['js', 'ts'],
  },
  {
    name: 'style.scss',
    frameworks: ['piral-core', 'piral'],
    target: '<src>/style.scss',
    languages: ['js', 'ts'],
  },
  {
    name: 'core-index.html',
    frameworks: ['piral-core', 'piral'],
    target: '<src>/index.html',
    languages: ['js', 'ts'],
  },
  {
    name: 'base-index.html',
    frameworks: ['piral-base'],
    target: '<src>/index.html',
    languages: ['js', 'ts'],
  },
  {
    name: 'core-index.jsx',
    frameworks: ['piral-core', 'piral'],
    target: '<src>/index.jsx',
    languages: ['js'],
  },
  {
    name: 'core-index.tsx',
    frameworks: ['piral-core', 'piral'],
    target: '<src>/index.tsx',
    languages: ['ts'],
  },
  {
    name: 'base-index.js',
    frameworks: ['piral-base'],
    target: '<src>/index.js',
    languages: ['js'],
  },
  {
    name: 'base-index.ts',
    frameworks: ['piral-base'],
    target: '<src>/index.ts',
    languages: ['ts'],
  },
  {
    name: 'full-layout.jsx',
    frameworks: ['piral'],
    target: '<src>/layout.jsx',
    languages: ['js'],
  },
  {
    name: 'full-layout.tsx',
    frameworks: ['piral'],
    target: '<src>/layout.tsx',
    languages: ['ts'],
  },
  {
    name: 'core-layout.jsx',
    frameworks: ['piral-core'],
    target: '<src>/layout.jsx',
    languages: ['js'],
  },
  {
    name: 'core-layout.tsx',
    frameworks: ['piral-core'],
    target: '<src>/layout.tsx',
    languages: ['ts'],
  },
  {
    name: 'tsconfig.json',
    frameworks: ['piral-base', 'piral-core', 'piral'],
    target: '<root>/tsconfig.json',
    languages: ['ts'],
  },
]);
