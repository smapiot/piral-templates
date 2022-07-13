import { resolve } from 'path';
import { createPiletTemplateFactory } from '@smapiot/template-utils';

const root = resolve(__dirname, '..');

export default createPiletTemplateFactory(root, () => [
  {
    languages: ['js'],
    name: 'index.jsx',
    target: '<src>/index.jsx',
  },
  {
    languages: ['ts'],
    name: 'index.tsx',
    target: '<src>/index.tsx',
  },
  {
    languages: ['ts'],
    name: 'tsconfig.json',
    target: '<root>/tsconfig.json',
  },
]);
