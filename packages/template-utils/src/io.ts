import { deepMerge } from './merge';
import type { TemplateFile } from './types';

export function mergeFiles(files: Array<TemplateFile>, deep: Array<string | RegExp>) {
  const result: Record<string, Array<TemplateFile>> = {};
  const tests = deep.map((m) =>
    typeof m === 'string' ? (path: string) => path === m : (path: string) => m.test(path),
  );

  for (const file of files) {
    const items = result[file.path];

    if (Array.isArray(items)) {
      items.push(file);
    } else {
      result[file.path] = [file];
    }
  }

  return Object.keys(result).map((path) => {
    const items = result[path];

    // let's merge the content in case of a package.json (maybe also other JSONs?)
    if (items.length !== 1 && tests.some((test) => test(path))) {
      const obj = items
        .map(({ content }) => JSON.parse(content.toString('utf8')))
        .reduce((p, c) => deepMerge(p, c), {});
      const str = JSON.stringify(obj);
      return {
        path,
        content: Buffer.from(str, 'utf8'),
      };
    }

    // last one wins
    return items.pop();
  });
}
