import { resolve, relative, isAbsolute } from 'path';
import { renderFile } from 'ejs';
import { TemplateFile, TemplateSource } from './types';
import { log } from './log';

export interface TemplateData {
  projectRoot: string;
  root: string;
  src: string;
}

function fillTemplate<T extends TemplateData>(sourceDir: string, name: string, data: T) {
  const path = resolve(sourceDir, `${name}.ejs`);

  log('verbose', `Filling template of "${path}" ...`);

  return new Promise<string>((resolve, reject) => {
    renderFile(path, data, (err, str) => {
      if (err) {
        log('error', `Could not fill template at "${path}": ${err}`);
        reject(err);
      } else {
        log('verbose', `Filled template at "${path}" ...`);
        resolve(str);
      }
    });
  });
}

export async function getFileFromTemplate<T extends TemplateData>(
  sourceDir: string,
  source: TemplateSource,
  data: T,
): Promise<TemplateFile> {
  const { target, name } = source;
  const absPath = Object.keys(data).reduce((t, name) => {
    const k = `<${name}>`;
    const v = data[name];

    if (typeof v === 'string' && t.indexOf(k) !== -1) {
      return t.replace(k, v);
    }

    return t;
  }, target);
  const path = isAbsolute(absPath) ? relative(data.projectRoot, absPath) : absPath;

  log('verbose', `Return template "${name}" with path "${path}" (from "${target}")`);

  const content = await fillTemplate(sourceDir, name, data);

  return {
    content: Buffer.from(content, 'utf8'),
    path,
  };
}
