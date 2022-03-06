[![Piral Logo](https://github.com/smapiot/piral/raw/main/docs/assets/logo.png)](https://piral.io)

# [Pilet Template - Default](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE)

This is the default scaffolding template for a new pilet.

## Usage

Use the template with `pilet new` or `npm init pilet`:

```sh
# directly via the CLI (prefer to prefix with npx)
pilet new --template default <other-options>

# via the initializer - best option (NPM v6)
npm init pilet --template default <other-options>

# via the initializer - best option (NPM v7 and v8)
npm init pilet -- --template default <other-options>
```

## Variables

The following variables are available when scaffolding. They can be applied via the CLI flags, e.g.,

```sh
pilet new --template empty --vars.foo "bar" --vars.qxz "something else"
```

For this template we have:

- **src**: Sets the directory of the source files. By default it's `<root>/src`.
- **plugins**: Sets the app shell's plugins to consider. By default it's derived from the used Piral instance.

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
