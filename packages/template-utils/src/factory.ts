import { resolve } from 'path';
import { getFileFromTemplate } from './template';
import { configure, ExecutionDetails } from './parent';
import { getLanguageExtension, getPackageJsonWithSource, getPlugins } from './utils';
import { PiralTemplateArgs, PiletTemplateArgs, TemplateFile, PiletTemplateSource, PiralTemplateSource } from './types';

export function createPiletTemplateFactory(
  templateRoot: string,
  allSources: Array<PiletTemplateSource>,
  defaultArgs: Partial<PiletTemplateArgs> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return (projectRoot: string, args: PiletTemplateArgs, details: ExecutionDetails): Promise<Array<TemplateFile>> => {
    configure(templateRoot, details);

    const {
      language = 'ts',
      sourceName,
      src = '<root>/src',
      plugins = getPlugins(projectRoot, sourceName),
      mocks = '<src>/mocks',
      ...rest
    } = { ...defaultArgs, ...args };
    const sources = allSources.filter((m) => m.languages.includes(language));
    const data = {
      ...rest,
      language,
      plugins,
      projectRoot,
      root: '.',
      sourceName,
      extension: getLanguageExtension(language),
      src,
      mocks,
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

  return async (projectRoot: string, args: PiralTemplateArgs, details: ExecutionDetails): Promise<Array<TemplateFile>> => {
    configure(templateRoot, details);

    const {
      language = 'ts',
      packageName = 'piral',
      mocks = '<src>/mocks',
      src = '<root>/src',
      title = 'My Piral Instance',
      reactVersion = 17,
      plugins = [],
      ...rest
    } = { ...defaultArgs, ...args };
    const sources = allSources.filter((m) => m.languages.includes(language) && m.frameworks.includes(packageName));
    const data = {
      ...rest,
      title,
      language,
      plugins,
      projectRoot,
      root: '.',
      reactVersion,
      packageName,
      extension: getLanguageExtension(language, packageName !== 'piral-base'),
      src,
      mocks,
    };

    return Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
  };
}
