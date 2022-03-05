import { relative, resolve } from 'path';
import { getFileFromTemplate } from './template';
import { getLanguageExtension, getPackageJsonWithSource, getPlugins } from './utils';
import { PiralTemplateArgs, PiletTemplateArgs, TemplateFile, PiletTemplateSource, PiralTemplateSource } from './types';

export function createPiletTemplateFactory(
  templateRoot: string,
  allSources: Array<PiletTemplateSource>,
  defaultArgs: Partial<PiletTemplateArgs> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return (root: string, args: PiletTemplateArgs): Promise<Array<TemplateFile>> => {
    const {
      language = 'ts',
      sourceName,
      src = 'src',
      plugins = getPlugins(root, sourceName),
      ...rest
    } = { ...defaultArgs, ...args };
    const sources = allSources.filter((m) => m.languages.includes(language));
    const data = {
      ...rest,
      language,
      plugins,
      root: '.',
      sourceName,
      extension: getLanguageExtension(language),
      src: relative(root, resolve(root, src)),
    };

    return Promise.all([
      ...sources.map((source) => getFileFromTemplate(sourceDir, source, data)),
      getPackageJsonWithSource(data.src, `index${data.extension}`),
    ]);
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
      language,
      plugins,
      root: '.',
      packageName,
      extension: getLanguageExtension(language, packageName !== 'piral-base'),
      src: relative(root, resolve(root, src)),
      mocks: relative(root, resolve(root, src, mocks)),
    };

    return Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
  };
}
