# Javascript Samples

This project provides a reference implementation of useful Javascript patterns,
including an approach to multi-module project structure and
the Flux pattern for state management.

Points of interest include:

## Multi-Module Project Structure

The repository contains two modules:
- `flux-sudoku`, which contains the high-level policy for the game of Sudoku
- `react-sudoku`, which contains a React-based GUI for the game and depends on `flux-sudoku`

There's a few tricks necessary to make this work:

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

### Using `file:` dependencies in consumer modules

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

## The Flux pattern for state management

Flux is a pattern for managing state in an event-driven architecture,
which you can read about [here](https://github.com/facebook/flux),
and more in depth [here](https://facebook.github.io/flux/).

Often, projects that want to use the Flux pattern do so via a library like Redux;
however, since the Flux pattern is very lightweight, you can get a long way
by just creating a simple Flux implementation yourself, and transitioning to Redux
once the additional tooling it provides becomes valuable enough to offset
the additional complexity it brings.

Key landmarks of the Flux pattern are:

### The Store

The store contains a data structure, called "the state", describing the current state of the application.
(There are interesting decisions to make concerning *how much* information to include in the store's state.
Most often, "the information that is relevant to business logic" is a good heuristic.)

The store receives small data structures, called "actions", through an `update` method,
and updates the state accordingly.
It also notifies a set of subscribed callbacks any time the state changes.

Apart from the specific state changes made for a given action, the store is actually completely generic.
(In fact, a generic store implementation is one of the main things that libraries like Redux give you.)
Check out `flux-sudoku`'s store implementation in `flux-sudoku/src/infrastructure/create-store.js`.
The state change functions themselves, being application-specific, are located in `flux-sudoku/sudoku.js`.

### The Action Creators

Action creators are the entry point into the Flux data loop.
They are functions that are called by the consumer (which, in the case of `react-sudoku`, are React components).
The job of action creators is to send "actions" to the store, and do any work necessary
to decide which actions to send. Any asynchronous work like calls to backend APIs happens here.

In this project, the action creators are exposed through the public interface of `sudoku.js`.
A good example of an action creator is `flux-sudoku/src/load-puzzle/load-puzzle-action-creator.js`.

### The View

In typical diagrams of the Flux pattern, one point of the loop includes the View.
The View (which typically consists of React components, but can really be anything)
subscribes to the Flux loop and is notified whenever the state has changed.
The View can then fetch the current state and update itself accordingly.

If you're familiar with "Clean Architecture" or the "Ports and Adapters" pattern,
an important observation is that the first parts of the Flux loop--the store,
its state changes, and the action creators--comprise the core of the application,
while the View is an implementation detail which plugs into the core via
the action creator functions and the `subscribe/getState` mechanism.

Accordingly, the View in this application is extracted into the `react-sudoku` module.
That's why you don't see any obvious representation of the View portion of the loop
in `flux-sudoku`.

### The Dispatcher

The Dispatcher is mentioned in most Flux diagrams and discussions, but only really
becomes relevant if you have multiple stores. Often, projects can get by with only one store
(in fact, Redux enforces this!), so this project does not include a dispatcher.

## Testing Patterns

One weakness of the Flux pattern, whether you're using Redux or not, is that it encourages devs
to write super-fine-grained unit tests for the different parts of the Flux loop.
On the one hand, it's positive that Flux *enables* writing these kinds of fine-grained tests.
On the other hand, it's easy to get caught up in the pattern and write super-low-level unit tests
when a higher-level test would provide the same value for less effort.

Check out the test at `flux-sudoku/src/sudoku.spec.js` for an example of a higher-level test
which integrates over the flux loop without involving any low-level details of the UI layer.

This test allows for cheap, refactor-friendly testing of simple action creators and state changes,
and removes the need for individual unit tests of parts of the application whose behavior
is completely exercised by the high-level test.

Parts of the loop which merit more fine-grained testing,
such as `flux-sudoku/src/make-move/make-move-state-change.js`,
can still be easily tested in isolation.
