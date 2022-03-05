import { resolve } from 'path';
import { renderFile } from 'ejs';
import { TemplateFile, TemplateSource } from './types';
import { log } from './log';

function fillTemplate(sourceDir: string, name: string, data: any = {}) {
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

  log('verbose', `Return template "${name}" with path "${path}" (from "${target}")`);

  const content = await fillTemplate(sourceDir, name, data);

  return {
    content: Buffer.from(content, 'utf8'),
    path,
  };
}
