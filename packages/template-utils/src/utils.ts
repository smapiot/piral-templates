import { posix, resolve, dirname, relative, isAbsolute } from 'path';
import { readFileSync } from 'fs';
import { log } from './log';
import { TemplateSource } from './types';

export function getPackageJsonWithSource(root: string, targetDir: string, fileName: string): TemplateSource {
  const absPath = posix.join(targetDir, fileName);
  const path = isAbsolute(absPath) ? relative(root, absPath) : absPath;

  log('verbose', `Adding "source" to package.json: "${path}"`);

  return {
    languages: ['ts', 'js'],
    name: 'package.json',
    content: JSON.stringify({ source: path }),
    target: '<root>/package.json',
  };
}

export function getPiralInstance(root: string, sourceName: string) {
  try {
    const packageJsonPath = require.resolve(`${sourceName}/package.json`, {
      paths: [root],
    });
    log('verbose', `Found package JSON in "${packageJsonPath}"`);
    const sourcePath = dirname(packageJsonPath);
    const details = require(packageJsonPath);
    const types = details.types || details.typings;
    log('verbose', `Looking for types in "${types}"`);
    const typingsPath = types !== undefined ? resolve(sourcePath, types) : undefined;
    const app = details.app;
    log('verbose', `Looking for types in "${app}"`);
    const appPath = app !== undefined ? resolve(sourcePath, app) : undefined;
    return {
      sourceName,
      sourcePath,
      details,
      appPath,
      typingsPath,
    };
  } catch (ex) {
    log('error', `Error when getting Piral instance: ${ex}`);
  }

  return undefined;
}

export function getPlugins(root: string, sourceName: string) {
  const plugins: Record<string, boolean> = {};

  log('verbose', `Getting the plugins of "${sourceName}/package.json" ...`);

  const piralInstance = getPiralInstance(root, sourceName);
  const typingsPath = piralInstance?.typingsPath;

  if (typingsPath) {
    log('verbose', `Reading file in "${typingsPath}"`);
    const typing = readFileSync(typingsPath, 'utf8');
    const match = /export interface PiletCustomApi extends (.*?) \{/g.exec(typing);

    // in case nothing has been found
    if (!match) {
      log('verbose', `No Piral instance plugins have been found`);
      return [];
    }

    const apis = match[1].split(', ');
    log('verbose', `Found Piral instance plugins "${match[1]}"`);

    for (const api of apis) {
      const pluginMatch = /^Pilet(.*)Api$/.exec(api);

      if (pluginMatch) {
        const name = pluginMatch[1].toLowerCase();
        plugins[name] = true;
      } else {
        log('warn', `Could not find plugin for Pilet API "${api}"`);
      }
    }
  }

  return plugins;
}

export function getLanguageExtension(language: string, isJsx = true) {
  switch (language) {
    case 'js':
      return isJsx ? '.jsx' : '.js';
    case 'ts':
    default:
      return isJsx ? '.tsx' : '.ts';
  }
}
