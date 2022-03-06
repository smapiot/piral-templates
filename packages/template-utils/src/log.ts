export type LogLevel = 'verbose' | 'info' | 'warn' | 'error';

export type DesiredLogLevel = 'disabled' | LogLevel;

let logLevel: DesiredLogLevel = 'warn';

export function setLogLevel(level: DesiredLogLevel) {
  logLevel = level;
}

export function log(level: LogLevel, message: string) {
  if (level === 'error') {
    if (logLevel !== 'disabled') {
      console.error(`[template] ${message}`);
    }
  } else if (level === 'warn') {
    if (logLevel !== 'error' && logLevel !== 'disabled') {
      console.warn(`[template] ${message}`);
    }
  } else if (level === 'info') {
    if (logLevel === 'verbose' || logLevel === 'info') {
      console.info(`[template] ${message}`);
    }
  } else if (level === 'verbose') {
    if (logLevel === 'verbose') {
      console.log(`[template] ${message}`);
    }
  }
}
