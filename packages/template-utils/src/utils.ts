import { posix, resolve, dirname } from 'path';
import { readFileSync } from 'fs';

export function getPackageJsonWithSource(targetDir: string, fileName: string) {
  return Promise.resolve({
    content: Buffer.from(`{"source":${JSON.stringify(posix.join(targetDir, fileName))}}`, 'utf8'),
    path: 'package.json',
  });
}

export function getPlugins(root: string, sourceName: string) {
  const plugins: Record<string, boolean> = {};

  try {
    const packageJsonPath = require.resolve(`${sourceName}/package.json`, {
      paths: [root],
    });
    const sourcePath = dirname(packageJsonPath);
    const details = require(packageJsonPath);
    const typingsPath = resolve(sourcePath, details.types || details.typings);
    const typing = readFileSync(typingsPath, 'utf8');
    const match = typing.match(/export interface PiletCustomApi extends (.*?) \{/g);
    const apis = match[1].split(', ');

    for (const api of apis) {
      const pluginMatch = api.match(/^Pilet(.*)Api$/);

      if (pluginMatch) {
        const name = pluginMatch[1].toLowerCase();
        plugins[name] = true;
      }
    }
  } catch {}

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
