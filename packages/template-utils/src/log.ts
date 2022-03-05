let logLevel: LogLevel = 'warn';

export type LogLevel = 'verbose' | 'info' | 'warn' | 'error';

export function setLogLevel(level: LogLevel) {
  logLevel = level;
}

export function log(level: LogLevel, message: string) {
  if (level === 'warn') {
    if (logLevel !== 'error') {
      console.warn(`[template] ${message}`);
    }
  } else if (level === 'error') {
    // should always be printed
    console.error(`[template] ${message}`);
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
