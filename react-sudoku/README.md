# `react-sudoku`

This module contains a standalone React application which
presents the game of sudoku using the `flux-sudoku` library.

## Running the app locally

1. Make sure you have node >= v6 on your machine.

2. Make sure the library modules are installed and built:

```bash
# in the flux-sudoku directory:
$ npm install
$ npm run build
```

3. Install `react-sudoku`:

```bash
# in the react-sudoku directory:
$ npm install
```

4. Start the local server:

```bash
# in the react-sudoku directory:
$ npm start
```

## Running the tests

After running `npm install`, you can start the test watcher with `npm test`.

## Local development

Local development is most seamless if you link `react-flux`
to the local modules it depends on.
There's a custom npm script to do this:

```bash
# in the react-sudoku directory:
$ npm run link-local-workspace
```

Note that even after linking, changes in library modules
will still need to get bundled into their respective build output files
before `react-sudoku` will see them.
You can run `npm run watch` in the library module you're working on
to make this happen automatically as you make changes.
