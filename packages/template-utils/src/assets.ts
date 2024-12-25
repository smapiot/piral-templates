import type { TemplateSource } from './types';

const assetsDeclaration = `// Change the declarations in this file if your bundler
// is configured to handle them differently.
// Standard behavior is to treat default exports as a
// link to the imported asset.
declare module '*.jpg' {
  const link: string;
  export default link;
}
declare module '*.png' {
  const link: string;
  export default link;
}
declare module '*.svg' {
  const link: string;
  export default link;
}
declare module '*.jpeg' {
  const link: string;
  export default link;
}
declare module '*.webp' {
  const link: string;
  export default link;
}
declare module '*.mp4' {
  const link: string;
  export default link;
}
declare module '*.mp3' {
  const link: string;
  export default link;
}
declare module '*.ogg' {
  const link: string;
  export default link;
}
declare module '*.wav' {
  const link: string;
  export default link;
}
declare module '*.ogv' {
  const link: string;
  export default link;
}
declare module '*.wasm' {
  const link: string;
  export default link;
}
declare module '*.gif' {
  const link: string;
  export default link;
}
declare module '*.codegen';
`;

export function getAssetsSource(): TemplateSource {
  return {
    languages: ['ts'],
    name: 'assets.d.ts',
    content: assetsDeclaration,
    target: '<src>/assets.d.ts',
  };
}
