import { resolve } from 'path';
import { getFileFromTemplate } from './template';
import { configure, ExecutionDetails } from './parent';
import { getLanguageExtension, getPackageJsonWithSource, getPlugins } from './utils';
import { PiralTemplateArgs, PiletTemplateArgs, TemplateFile, PiletTemplateSource, PiralTemplateSource } from './types';

export interface GetAllSources<TArgs, TSource> {
  (projectRoot: string, args: TArgs, details: ExecutionDetails): Array<TSource>;
}

export function createPiletTemplateFactory<TExtra = {}>(
  templateRoot: string,
  getAllSources: GetAllSources<PiletTemplateArgs & Partial<TExtra>, PiletTemplateSource>,
  defaultArgs: Partial<PiletTemplateArgs & TExtra> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return (projectRoot: string, args: PiletTemplateArgs, details: ExecutionDetails): Promise<Array<TemplateFile>> => {
    configure(templateRoot, details);

    const allArgs = { ...defaultArgs, ...args };
    const {
      language = 'ts',
      sourceName,
      src = '<root>/src',
      plugins = getPlugins(projectRoot, sourceName),
      mocks = '<src>/mocks',
    } = allArgs;
    const allSources = getAllSources(projectRoot, allArgs, details);
    const sources = allSources.filter((m) => m.languages.includes(language));
    const data = {
      ...allArgs,
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

export function createPiralTemplateFactory<TExtra = {}>(
  templateRoot: string,
  getAllSources: GetAllSources<PiralTemplateArgs & Partial<TExtra>, PiralTemplateSource>,
  defaultArgs: Partial<PiralTemplateArgs & TExtra> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return async (
    projectRoot: string,
    args: PiralTemplateArgs,
    details: ExecutionDetails,
  ): Promise<Array<TemplateFile>> => {
    configure(templateRoot, details);

    const allArgs = { ...defaultArgs, ...args };
    const {
      language = 'ts',
      packageName = 'piral',
      mocks = '<src>/mocks',
      src = '<root>/src',
      title = 'My Piral Instance',
      reactVersion = 17,
      plugins = [],
    } = allArgs;
    const allSources = getAllSources(projectRoot, allArgs, details);
    const sources = allSources.filter((m) => m.languages.includes(language) && m.frameworks.includes(packageName));
    const data = {
      ...allArgs,
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
