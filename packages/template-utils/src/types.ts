export interface TemplateFile {
  path: string;
  content: Buffer;
}

export interface TemplateSource {
  name: string;
  content?: string;
  languages: Array<'js' | 'ts'>;
  target: string;
}

export interface PiletTemplateSource extends TemplateSource {}

export interface PiralTemplateSource extends TemplateSource {
  frameworks: Array<'piral' | 'piral-core' | 'piral-base'>;
}

export interface TemplateArgs {
  language?: 'js' | 'ts';
  src?: string;
  mocks?: string;
}

export interface PiletTemplateArgs extends TemplateArgs {
  sourceName: string;
  plugins?: Record<string, boolean>;
}

export interface PiralTemplateArgs extends TemplateArgs {
  packageName?: 'piral' | 'piral-core' | 'piral-base';
  title?: string;
  plugins?: Array<string>;
  reactVersion?: number;
}
