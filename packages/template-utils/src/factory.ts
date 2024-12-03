import { resolve, basename } from 'path';
import { mergeFiles } from './io';
import { getAssetsSource } from './assets';
import { configure, ExecutionDetails } from './parent';
import { getFileFromTemplate, normalizeData } from './template';
import { getLanguageExtension, getPackageJsonWithSource, getPlugins } from './utils';
import type {
  PiralTemplateArgs,
  PiletTemplateArgs,
  TemplateFile,
  PiletTemplateSource,
  PiralTemplateSource,
} from './types';

export interface GetAllSources<TArgs, TSource> {
  (projectRoot: string, args: TArgs, details: ExecutionDetails): Array<TSource>;
}

export function createPiletTemplateFactory<TExtra = {}>(
  templateRoot: string,
  getAllSources: GetAllSources<PiletTemplateArgs & Partial<TExtra>, PiletTemplateSource>,
  defaultArgs: Partial<PiletTemplateArgs & TExtra> = {},
) {
  const sourceDir = resolve(templateRoot, 'templates');

  return async (
    projectRoot: string,
    args: PiletTemplateArgs,
    details: ExecutionDetails,
  ): Promise<Array<TemplateFile>> => {
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
    const data = normalizeData({
      ...allArgs,
      language,
      plugins,
      projectRoot,
      root: '.',
      piletName: basename(projectRoot),
      sourceName,
      extension: getLanguageExtension(language),
      src,
      mocks,
    });
    const defaultSources = [
      getAssetsSource(),
      getPackageJsonWithSource(data.projectRoot, data.src, `index${data.extension}`),
    ];

    const sources = [...allSources, ...defaultSources].filter((m) => m.languages.includes(language));
    const files = await Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
    return mergeFiles(files);
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
    const data = normalizeData({
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
    });

    const defaultSources = [getAssetsSource()];
    const customSources = allSources.filter((m) => m.frameworks.includes(packageName));
    const sources = [...customSources, ...defaultSources].filter((m) => m.languages.includes(language));
    const files = await Promise.all(sources.map((source) => getFileFromTemplate(sourceDir, source, data)));
    return mergeFiles(files);
  };
}
