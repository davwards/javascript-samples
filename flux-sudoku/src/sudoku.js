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
 *
 * This app is simple enough that it needs only one store.
 * Accordingly, the dispatch function that the action creators use
 * is just the update function for the store.
 *
 * If you needed more stores, you could construct them here,
 * then create dispatch, subscribe, and getState functions
 * that aggregate over all of the stores.
 * At that point, it might be time for Redux!
 */

const initialState = {
  loadingPuzzle: false,
  solved: false
}

export default function Sudoku(puzzleGenerator) {
  const store = createStore(initialState, stateChanges);
  const dispatch = store.update;

  return {
    initialize: Initialize(dispatch, puzzleGenerator),

    makeMove: ({row, column, value}) => {
      dispatch({ type: 'MAKE_MOVE', row: row, column: column, value: value })
    },

    subscribe: store.subscribe,

    getState: store.getState
  };
}
