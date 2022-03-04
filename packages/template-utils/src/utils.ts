import { resolve, posix } from 'path';
import { renderFile } from 'ejs';
import { TemplateFile, TemplateSource } from './types';

function fillTemplate(sourceDir: string, name: string, data: any = {}) {
  const path = resolve(sourceDir, `${name}.ejs`);
  return new Promise<string>((resolve, reject) => {
    renderFile(path, data, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  });
}

export function getPackageJsonWithSource(targetDir: string, fileName: string) {
  return Promise.resolve({
    content: Buffer.from(`{"source":${JSON.stringify(posix.join(targetDir, fileName))}}`, 'utf8'),
    path: 'package.json',
  });
}

export async function getFileFromTemplate(
  sourceDir: string,
  source: TemplateSource,
  data: any = {},
): Promise<TemplateFile> {
  const { target, name } = source;
  const path = Object.keys(data).reduce((t, name) => {
    const k = `<${name}>`;
    const v = data[name];

    if (typeof v === 'string' && t.indexOf(k) !== -1) {
      return t.replace(k, v);
    }

    return t;
  }, target);

  const content = await fillTemplate(sourceDir, name, data);

  return {
    content: Buffer.from(content, 'utf8'),
    path,
  };
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
