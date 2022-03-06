[![Piral Logo](https://github.com/smapiot/piral/raw/main/docs/assets/logo.png)](https://piral.io)

# [Piral Template - Default](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE)

This is the default scaffolding template for a new Piral instance.

## Usage

Use the template with `piral new` or `npm init piral-instance`:

```sh
# directly via the CLI (prefer to prefix with npx)
piral new --template default <other-options>

# via the initializer - best option (NPM v6)
npm init piral-instance --template default <other-options>

# via the initializer - best option (NPM v7 and v8)
npm init piral-instance -- --template default <other-options>
```

## Variables

The following variables are available when scaffolding. They can be applied via the CLI flags, e.g.,

```sh
piral new --template empty --vars.foo "bar" --vars.qxz "something else"
```

For this template we have:

- **title**: Sets the title in the *index.html* page. By default it's `My Piral Instance`.
- **src**: Sets the directory of the source files. By default it's `<root>/src`.
- **mocks**: Sets the directory of the backend mocks. By default it's `<src>/mocks`.
- **plugins**: Sets the plugins to include. By default it's `[]`.

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
