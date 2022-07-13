[![Piral Logo](https://github.com/smapiot/piral/raw/main/docs/assets/logo.png)](https://piral.io)

# [Pilet Template - Empty](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE)

This is the empty scaffolding template for a new pilet. It will just create an empty pilet with only an empty `setup` function.

## Usage

Use the template with `pilet new` or `npm init pilet`:

```sh
# directly via the CLI (prefer to prefix with npx)
pilet new <app-shell> --template empty <other-options>

# via the initializer - best option (NPM v6)
npm init pilet --source <app-shell> --template empty <other-options>

# via the initializer - best option (NPM v7 and v8)
npm init pilet -- --source <app-shell> --template empty <other-options>
```

## Variables

The following variables are available when scaffolding. They can be applied via the CLI flags, e.g.,

```sh
pilet new <app-shell> --template empty --vars.foo "bar" --vars.qxz "something else"
```

For this template we have:

- **src**: Sets the directory of the source files. By default it's `<root>/src`.

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
