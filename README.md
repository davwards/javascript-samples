# Javascript Samples

This project provides a reference implementation of useful Javascript patterns,
including an approach to multi-module project structure and
the Flux pattern for state management.

Points of interest include:

- **State management via the Flux pattern**

  Flux is a pattern for managing state in an event-driven architecture,
  which you can read about [here](https://github.com/facebook/flux),
  and more in depth [here](https://facebook.github.io/flux/).

  Often, projects that want to use the Flux pattern do so via a library like Redux.
  However, the Flux pattern is very lightweight, so you can get a long way
  by just creating a simple Flux implementation yourself.

  Later on, the additional tooling Redux provides may become valuable enough
  to offset the additional complexity it entails. At that point,
  transitioning to it isn't hard, since it's all just Flux anyway.

  This project features a very simple, library-free implementation
  of the Flux pattern in its core module.
  You can find more details in `flux-sudoku/README.md`.

- **Testing patterns for avoiding tightly coupled tests in a Flux architecture**

  Flux apps often suffer from tests that are too tightly coupled
  to the structure of the system.
  But it doesn't have to be this way!
  You can find more details in `flux-sudoku/README.md`.

- **Multi-module project structure.**

  For a variety of reasons, it's helpful to divide a project into modules
  that separate high-level policy from low-level implementation details.
  This project contains the following modules:
  - `flux-sudoku`, which contains the high-level policy for the game of Sudoku
  - `react-sudoku`, which contains a React-based GUI for the game and depends on `flux-sudoku`

  Getting a project structure like this to work tends to require some nuance
  in any build system, but with NPM this actually works out pretty well.
  You can find more details about the particular tricks that make it work
  below.

## Multi-Module Project Structure

The modules in the project come in two flavors:

- **Library** modules are not standalone applications;
  rather, they're intended to be imported into other modules.
- **Deployable** modules depend on library modules and can be deployed as standalone apps.

`flux-sudoku` is a library module, while `react-sudoku` is a deployable module.

Here are the tricks that make the build work:

### Using Webpack with "library" output

Typically, modules pulled in via NPM are expected to already be in a "built" format
(e.g., with minification and transpilation already done).

You can use Webpack to package your library modules this way,
but including the following in your `webpack.config.js` is critical:

*(snippet from `flux-sudoku/webpack.config.js`)*
```javascript
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'sudokuFlux',
    libraryTarget: 'umd'
  }
//...
```

The value of `library` needs to be a valid Javascript variable name,
but other than that its value is effectively arbitrary (it just needs to exist).

Setting `libraryTarget` to `umd` will allow consumers to import it
the same way they would import other NPM modules, e.g.:

*(snippet from `react-sudoku/src/index.js`)*
```javascript
import { Sudoku, FakePuzzleGenerator } from 'flux-sudoku';
```

If you omit `libraryTarget: 'umd'`, you will run into some pretty inscrutable errors
depending on various particulars.
For example, your build may succeed, but when consumers try to import things
from your library, all imported variables will be `undefined`.

Finally, the `main` path specified in your `package.json` must correspond to Webpack's output:

*(snippet from `flux-sudoku/package.json`)*
```json
  "main": "dist/bundle.js",
```

### Using `file:` dependencies to depend on library modules

The `react-sudoku` module declares its dependency on `flux-sudoku` as follows:

*(snippet from `react-sudoku/package.json`)*
```json
    "flux-sudoku": "file:../flux-sudoku",
```

Importantly, this causes the contents of `flux-sudoku` to be
**copied into `react-sudoku`'s `npm_modules` directory on install.**
Therefore, changes to `flux-sudoku` will not immediately be available to `react-sudoku`.
(See the next section.)

### Using `npm link` and `webpack --watch` for seamless development

With a small amount of setup, you can create a pretty slick multi-module workflow.
We need to solve the following problems:

- As you make changes to library modules (like `flux-sudoku`), you want
  the `bundle.js` file created by Webpack to update automatically.
- As the `bundle.js` files of library modules change, you want those changes to
  immediately be available to the modules consuming them (like `react-sudoku`).

To accomplish this, do the following:

1. Ensure you've run `npm install` in both the `flux-sudoku` and `react-sudoku` directories

2. Use `npm link` to create a symlink between the `flux-sudoku` directory and its doppelganger
   in `react-sudoku/node_modules`. You can do this via an npm script I've added to `react-sudoku`:

   ```bash
   # In the react-sudoku directory:
   $ npm run link-local-workspace
   ```

   (See the `link-local-workspace` npm script defined in `react-sudoku`'s `package.json`
   for how `npm link` is used to accomplish this.)

3. In a separate terminal, start a Webpack watcher in the `flux-sudoku` directory:

   ```bash
   $ npm run watch # see the "watch" npm script in package.json for details
   ```

And you're done! Changes in `flux-sudoku` will now be immediately compiled by webpack,
and `react-sudoku` will immediately see those changes via the symlink created by `npm link`.

For an even nicer workflow, in a separate shell from the one running `watch` for `flux-sudoku`,
you can start up `react-sudoku`'s built-in watcher and dev server:

```bash
# in the react-sudoku directory:
$ npm start
```

With `react-sudoku`'s dev server, the webpack watcher for `flux-sudoku`, and the `npm link` symlink,
changes in both `flux-sudoku` and `react-sudoku` will trigger refreshes of the dev server
for instant feedback.

