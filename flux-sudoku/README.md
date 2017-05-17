# `flux-sudoku`

This module contains the high-level policy for the game of Sudoku,
implemented in the Flux pattern.

It's public API is exported from `index.js` and consists mostly of
the `Sudoku` object found in `src/sudoku.js`.

## Running the tests

In the `flux-sudoku` directory, run the following:

```bash
$ npm install
$ npm test
```

## Building the library

The library will need to be built before any other modules can install it.
Run the following:

```bash
$ npm run build
```

You can also start a watcher that will rebuild the library as you make changes:

```bash
$ npm run watch
```

## Shape of the "Flux Loop"

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
Check out `flux-sudoku`'s store implementation in `src/infrastructure/create-store.js`.
Since the state changes associated with a given action are application specific,
they are extracted into separate functions
which are provided to the store from `src/sudoku.js`.

**NOTE for folks familiar with Redux:**
You might expect those "state change" functions to be the equivalent of Redux's "reducers",
but they're meaningfully different in structure.

A Redux reducer defines the changes for only a small sliver of the overall state,
over all the action types relevant to that part of the state.
The state-change functions in this project's implementation, on the other hand,
define the changes for the entire state over just one action type.

For example, in Redux you might have a "board" reducer
which defines all changes to the "board" portion of the state,
including how it should change for MAKE_MOVE actions.

With the state-change approach, there is instead a state change function
specific to MAKE_MOVE actions which updates the entire state,
including the part relevant to the board.

So state-change functions serve a similar purpose to reducers,
but are structurally sideways to them.

### The Action Creators

Action creators are the entry point into the Flux data loop.
They are functions that are called by the consumer (which, in the case of `react-sudoku`, are React components).
The job of action creators is to send "actions" to the store, and do any work necessary
to decide which actions to send. Any asynchronous work like calls to backend APIs happens here.

In this project, the action creators are exposed through the public interface of `sudoku.js`.
A good example of an action creator is `src/load-puzzle/load-puzzle-action-creator.js`.

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

One weakness of the Flux pattern, whether you're using Redux or not,
is that it encourages devs to write super-fine-grained unit tests
for the different parts of the Flux loop.
On one hand, it speaks well of the Flux pattern that
it *enables* writing these kinds of fine-grained tests.
On the other hand, it's easy to get caught up in the pattern
and write super-low-level unit tests
when a higher-level test would provide the same value for less effort.

Check out the test at `src/sudoku.spec.js`
for an example of a higher-level test
which integrates over the flux loop
without involving any low-level details from the UI layer.

This test allows for cheap, refactor-friendly testing of
simple action creators and state changes,
and removes the need for individual unit tests around
parts of the application whose behavior
is completely exercised by the high-level test.

Parts of the loop which merit more fine-grained testing,
such as `src/make-move/make-move-state-change.js`,
can still be easily tested in isolation.

