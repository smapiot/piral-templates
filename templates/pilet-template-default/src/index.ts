import { resolve } from 'path';
import { createPiletTemplateFactory, PiletTemplateSource } from '@smapiot/template-utils';

const root = resolve(__dirname, '..');

interface DefaultPiletArgs {
  title: string;
  feedUrl: string;
  agents: boolean;
}

export default createPiletTemplateFactory<DefaultPiletArgs>(root, (_, { agents }) => {
  const sources: Array<PiletTemplateSource> = [
    {
      languages: ['js'],
      name: 'index.jsx',
      target: '<src>/index.jsx',
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
      languages: ['ts'],
      name: 'Page.tsx',
      target: '<src>/Page.tsx',
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
