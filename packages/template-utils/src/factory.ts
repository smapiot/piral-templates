import { relative, resolve } from 'path';
import { getFileFromTemplate, getLanguageExtension } from './utils';
import { PiralTemplateArgs, PiletTemplateArgs, TemplateFile, PiletTemplateSource, PiralTemplateSource } from './types';

export function createPiletTemplateFactory(
  templateRoot: string,
  allSources: Array<PiletTemplateSource>,
  defaultArgs: Partial<PiletTemplateArgs> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return (root: string, args: PiletTemplateArgs): Promise<Array<TemplateFile>> => {
    const { language = 'ts', src = 'src', sourceName, plugins = {}, ...rest } = { ...defaultArgs, ...args };
    const sources = allSources.filter((m) => m.languages.includes(language));
    const data = {
      ...rest,
      sourceName,
      root: '.',
      src: relative(root, resolve(root, src)),
      plugins,
    };

    return Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
  };
}

export function createPiralTemplateFactory(
  templateRoot: string,
  allSources: Array<PiralTemplateSource>,
  defaultArgs: Partial<PiralTemplateArgs> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return async (root: string, args: PiralTemplateArgs): Promise<Array<TemplateFile>> => {
    const {
      language = 'ts',
      packageName = 'piral',
      mocks = 'mocks',
      src = 'src',
      title = 'My Piral Instance',
      plugins = [],
      ...rest
    } = { ...defaultArgs, ...args };
    const sources = allSources.filter((m) => m.languages.includes(language) && m.frameworks.includes(packageName));
    const data = {
      ...rest,
      title,
      root: '.',
      extension: getLanguageExtension(language, packageName !== 'piral-base'),
      src: relative(root, resolve(root, src)),
      mocks: relative(root, resolve(root, src, mocks)),
    };

    return Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
  };
}
