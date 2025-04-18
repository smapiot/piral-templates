[![Piral Logo](https://github.com/smapiot/piral/raw/main/docs/assets/logo.png)](https://piral.io)

# [Pilet Template - Angular](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE)

This is the default template for creating a new pilet using Angular.

## Usage

Use the template with `pilet new` or `npm init pilet`:

```sh
# directly via the CLI (prefer to prefix with npx)
pilet new <app-shell> --template angular <other-options>

# via the initializer - best option (NPM v6)
npm init pilet --source <app-shell> --template angular <other-options>

# via the initializer - best option (NPM v7 and v8)
npm init pilet -- --source <app-shell> --template angular <other-options>
```

## Variables

The following variables are available when scaffolding. They can be applied via the CLI flags, e.g.,

```sh
pilet new <app-shell> --template angular --vars.standalone true --vars.ngVersion 16
```

For this template we have:

- **src**: Sets the directory of the source files. By default it's `<root>/src`.
- **standalone**: Sets if the pilet should be considered standalone, i.e., with Angular provided by the pilet. By default, this is derived from inspecting the used Piral instance (if it contains `piral-ng` then `standalone` would be set to `false`)
- **ngVersion**: Sets the (major) version of Angular to be used in case of a standalone pilet. Otherwise, would be discarded. By default, Angular 18 is used.
- **ngStandalone**: Sets if the Angular components should be configured as standalone in the `@Component` directive. By default, for Angular 19+ this is set to `true`. Otherwise, it will be set to `false`.

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
