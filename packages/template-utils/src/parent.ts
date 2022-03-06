import { resolve } from 'path';
import { log, setLogLevel } from './log';
import { checkVersion } from './version';

export enum ForceOverwrite {
  no,
  prompt,
  yes,
}

export enum LogLevels {
  disabled = 0,
  error = 1,
  warning = 2,
  info = 3,
  verbose = 4,
  debug = 5,
}

export interface ExecutionDetails {
  cliVersion: string;
  forceOverwrite: ForceOverwrite;
  isWindows: boolean;
  logLevel: LogLevels;
}

export function configure(root: string, details: ExecutionDetails) {
  if (details) {
    const packageJsonPath = resolve(root, 'package.json');
    const templateProject = require(packageJsonPath);
    const desiredVersion = templateProject.engines?.piral ?? '*';

    switch (details.logLevel) {
      case LogLevels.disabled:
        setLogLevel('disabled');
        break;
      case LogLevels.error:
        setLogLevel('error');
        break;
      case LogLevels.warning:
        setLogLevel('warn');
        break;
      case LogLevels.info:
        setLogLevel('info');
        break;
      case LogLevels.verbose:
      case LogLevels.debug:
        setLogLevel('verbose');
        break;
    }

    checkVersion(desiredVersion, details.cliVersion);
  } else {
    log(
      'warn',
      `The used version of the "piral-cli" is outdated. The templating may still work - if not you should use a more recent version of the "piral-cli".`,
    );
  }
}
