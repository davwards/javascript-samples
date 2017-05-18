import { flatMap, flatten } from 'lodash';
import createStore from './infrastructure/create-store';
import makeMove from './make-move/make-move-state-change';
import puzzleLoaded from './load-puzzle/puzzle-loaded-state-change';
import LoadPuzzle from './load-puzzle/load-puzzle-action-creator';

/* The Sudoku module is the core of the library. */

/*
 * Here we define the store's initial state and set of state changes.
 * Some state changes are trivial enough that they are
 * defined inline here, and tested only at the integration level.
 * Others are imported from other modules and tested individually.
 */

const initialState = {
  loadingPuzzle: false,
  puzzle: undefined,
  solved: false
}

const stateChanges = {
  LOADING_PUZZLE: (state) => {
    state.loadingPuzzle = true;
    state.puzzle = undefined;
  },
  PUZZLE_LOADED: puzzleLoaded,
  MAKE_MOVE: makeMove
}

export default function Sudoku(puzzleGenerator) {
  /*
   * This app is simple enough that it needs only one store.
   * Accordingly, the dispatch function that the action creators use
   * is just the update function for the store.
   *
   * If you needed more stores, you could construct them here,
   * then create dispatch, subscribe, and getState functions
   * that aggregate over all of the stores.
   * Although at that point, it might be time for Redux ;)
   */

  const store = createStore(initialState, stateChanges);
  const dispatch = store.update;

  /*
   * Sudoku's public methods include all the action creators,
   * which are how consumers of the library interact with it,
   * as well as methods for subscribing to updates
   * and getting state.
   *
   * As with state changes, some action creators are
   * trivial enough that they are defined inline here;
   * others, like loadPuzzle, are imported from
   * a separate module and tested independently.
   */

  return {
    loadPuzzle: LoadPuzzle(dispatch, puzzleGenerator),
    makeMove: ({row, column, value}) => dispatch({ type: 'MAKE_MOVE', row, column, value }),

    subscribe: store.subscribe,
    getState: store.getState
  };
}
