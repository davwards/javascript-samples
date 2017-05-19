# `local-puzzle-generator`

This module is an adapter wrapping a third-party sudoku generator,
[sudoku](https://www.npmjs.com/package/sudoku),
to make it compatible with the `flux-sudoku` module.
You can use the `localPuzzleGenerator` export from this library as
the `puzzleGenerator` dependency for a Sudoku game.

## Setting up the workspace

1. **First**, make sure you've installed and built `flux-sudoku`,
   which this module depends on,
   by running the following in the `flux-sudoku` directory:

   ```bash
   # in the flux-sudoku directory:
   $ npm install
   $ npm run build
   ```

2. Then, install dependencies for this module:

   ```bash
   # in the local-puzzle-generator directory
   $ npm install
   ```

3. Link the workspace, so changes in `flux-sudoku`'s build output
   will immediately be visible to this module.

   ```bash
   # in the local-puzzle-generator directory
   $ npm run link-local-workspace
   ```

4. Generate this module's build output, so other modules can import it.

   ```bash
   # in the local-puzzle-generator directory
   $ npm run build
   ```

## Running the tests

The test runner is Jest. You can run the tests with:

```bash
$ npm test
```

## Watching for build changes

If you're making changes to this module, you can run a watcher so that
the build output will automatically get updated with your changes:

```bash
$ npm run watch
```

