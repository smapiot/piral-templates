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

  console.log(`[template] Getting the plugins of "${sourceName}/package.json" ...`);

  try {
    const packageJsonPath = require.resolve(`${sourceName}/package.json`, {
      paths: [root],
    });
    console.log(`[template] Found package JSON in "${packageJsonPath}"`);
    const sourcePath = dirname(packageJsonPath);
    const details = require(packageJsonPath);
    console.log(`[template] Looking for types in "${details.types || details.typings}"`);
    const typingsPath = resolve(sourcePath, details.types || details.typings);
    console.log(`[template] Reading file in "${typingsPath}"`);
    const typing = readFileSync(typingsPath, 'utf8');
    const match = typing.match(/export interface PiletCustomApi extends (.*?) \{/g);
    const apis = match[1].split(', ');
    console.log(`[template] Received APIs "${match[1]}"`);

    for (const api of apis) {
      const pluginMatch = api.match(/^Pilet(.*)Api$/);

      if (pluginMatch) {
        console.log(`[template] Found API match "${pluginMatch[1]}"`);
        const name = pluginMatch[1].toLowerCase();
        plugins[name] = true;
      } else {
        console.log(`[template] Could not match "${api}"`);
      }
    }
  } catch (ex) {
    console.error(`[template] Error when obtaining the plugins: ${ex}`)
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
