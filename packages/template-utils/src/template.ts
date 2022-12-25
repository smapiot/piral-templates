import { resolve } from 'path';
import { renderFile } from 'ejs';
import { log } from './log';
import { makeRelative } from './utils';
import { TemplateFile, TemplateSource } from './types';

const findVariable = /<(\w+)>/g;

function replaceVariables<T extends TemplateData>(str: string, data: T) {
  let match = findVariable.exec(str);

  while (match) {
    const [m, id] = match;
    const val = data[id];

    if (typeof val === 'string') {
      str = str.replace(m, val);
    } else {
      str = str.replace(m, '.');
    }

    findVariable.lastIndex = 0;
    match = findVariable.exec(str);
  }

  return str;
}

export interface TemplateData {
  projectRoot: string;
  root: string;
  src: string;
  mocks: string;
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

export function normalizeData<T extends TemplateData>(data: T) {
  data.src = makeRelative(replaceVariables(data.src, data), data.projectRoot);
  data.mocks = makeRelative(replaceVariables(data.mocks, data), data.projectRoot);
  return data;
}

export async function getFileFromTemplate<T extends TemplateData>(
  sourceDir: string,
  source: TemplateSource,
  data: T,
): Promise<TemplateFile> {
  let { target, name, content } = source;

  const path = makeRelative(replaceVariables(target, data), data.projectRoot);

  if (!content) {
    log('verbose', `Return template "${name}" with path "${path}" (from "${target}")`);

    content = await fillTemplate(sourceDir, name, data);
  } else {
    log('verbose', `Return template "${name}" with content at path "${path}" (from "${target}")`);
  }

  return {
    content: Buffer.from(content, 'utf8'),
    path,
  };
}
