# `react-sudoku`

This module contains a standalone React application which
presents the game of sudoku using the `flux-sudoku` library.

## Running the app locally

1. Make sure you have node >= v6 on your machine.

2. Make sure the library modules are installed and built by
   running the following in **both** the `flux-sudoku` and `local-puzzle-generator` directories:

```bash
# in both the flux-sudoku and local-puzzle-generator directories:
$ npm install
$ npm run build
```

3. Install `react-sudoku`:

```bash
# in the react-sudoku directory:
$ npm install
```

4. Link the local libraries so changes in their output are visible to `react-sudoku`:

```bash
# in the react-sudoku directory:
$ npm run link-local-workspace
```

5. Start the local server:

```bash
# in the react-sudoku directory:
$ npm start
```

## Running the tests

After running `npm install`, you can start the test watcher with `npm test`.

## Local development

Even after linking with `npm run link-local-workspace`, changes in library modules
will still need to get bundled into their respective build output files
before `react-sudoku` will see them.
You can run `npm run watch` in the library module you're working on
to make this happen automatically as you make changes.
