import Initialize from './action-creators/initialize';
import createStore from './flux-store';
import * as stateChanges from './state-changes';

/* The Sudoku module is the core of the library.
 *
 * It has methods for all the action creators
 * which consumers of the library can invoke,
 * as well as methods for subscribing to and
 * getting state from the store.
 *
 * Some action creators, like makeMove, are
 * trivial enough that they are defined inline here;
 * others, like initialize, are imported from
 * a separate module so that they can be independently tested.
 *
 * This module also defines the initial state of the store
 * and wires it up with all of the state changes.
 */

const initialState = {
  loadingPuzzle: false,
  solved: false
}

export default function Sudoku(puzzleGenerator) {
  const store = createStore(initialState, stateChanges);

  return {
    initialize: Initialize(store, puzzleGenerator),

    makeMove: ({row, column, value}) => {
      store.update({ type: 'MAKE_MOVE', row: row, column: column, value: value })
    },

    subscribe: store.subscribe,

    getState: store.getState
  };
}
