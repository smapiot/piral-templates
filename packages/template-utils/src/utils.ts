import { posix, resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { log } from './log';

export function getPackageJsonWithSource(targetDir: string, fileName: string) {
  const path = posix.join(targetDir, fileName);

  log('verbose', `Adding 'source' to package.json "${path}" ...`);

  return Promise.resolve({
    content: Buffer.from(`{"source":${JSON.stringify(path)}}`, 'utf8'),
    path: 'package.json',
  });
}

export function getPlugins(root: string, sourceName: string) {
  const plugins: Record<string, boolean> = {};

  log('verbose', `Getting the plugins of "${sourceName}/package.json" ...`);

  try {
    const packageJsonPath = require.resolve(`${sourceName}/package.json`, {
      paths: [root],
    });
    log('verbose', `Found package JSON in "${packageJsonPath}"`);
    const sourcePath = dirname(packageJsonPath);
    const details = require(packageJsonPath);
    log('verbose', `Looking for types in "${details.types || details.typings}"`);
    const typingsPath = resolve(sourcePath, details.types || details.typings);
    log('verbose', `Reading file in "${typingsPath}"`);
    const typing = readFileSync(typingsPath, 'utf8');
    const match = /export interface PiletCustomApi extends (.*?) \{/g.exec(typing);
    const apis = match[1].split(', ');
    log('info', `Found Piral instance plugins "${match[1]}"`);

    for (const api of apis) {
      const pluginMatch = /^Pilet(.*)Api$/.exec(api);

      if (pluginMatch) {
        const name = pluginMatch[1].toLowerCase();
        plugins[name] = true;
      } else {
        log('warn', `Could not find plugin for Pilet API "${api}"`);
      }
    }
  } catch (ex) {
    log('error', `Error when obtaining the plugins: ${ex}`);
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
