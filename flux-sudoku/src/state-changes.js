import { flatMap, flatten } from 'lodash';
import validatePuzzle from './validate-puzzle';

/* This file exports a collection of "state changes". These are
 * functions which are named for a particular action type and
 * describe how the state should change in response to that action type.
 *
 * I've put them all in this file to make them easy to import all at once.
 * As needed, you could move particular state change definitions and
 * any associated helper functions out into their own modules,
 * and then import them here.
 *
 * For simplicity, the state changes directly mutate the state
 * rather than constructing and returning the new version.
 * This isn't especially dangerous, since only one state change
 * is called per update, and the state object never leaves the store;
 * only clones of it are returned from getState().
 *
 * If you needed to, with minor tweaks you could have your state changes
 * return a new copy of the state rather than mutating it, or you could
 * pass a fresh clone of the state from the store into the state change.
 */

export const INITIALIZE = (state) => { state.loadingPuzzle = true; };

export const PUZZLE_LOADED = (state, action) => {
  state.loadingPuzzle = false;
  state.puzzle = transformPuzzle(action.puzzle);
};

export const MAKE_MOVE = (state, action) => {
  const cell = state.puzzle[action.row][action.column];

  if(cellIsFillable(cell)) {
    cell.value = action.value;
    validatePuzzle(state.puzzle);
  }

  if(isSolved(state.puzzle)) {
    state.solved = true;
  }
};

function transformPuzzle(puzzle) {
  return puzzle.map(row =>
    row.map(cell =>
      cell === undefined
        ? { value: cell, given: false, valid: true }
        : { value: cell, given: true, valid: true }
    )
  );
}

function isSolved(puzzle) {
  const allCells = flatten(puzzle);
  return allCells.every(cell => cell.value !== undefined && cell.valid);
}

function cellIsFillable(cell) {
  return !cell.given;
}
