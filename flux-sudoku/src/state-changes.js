import { flatMap, flatten } from 'lodash';

/* This file exports a collection of "state changes",
 * functions which are named for a particular action type and
 * describe how the state should change in response to that action type.
 *
 * I've put them all in this file to make them easy to import all at once,
 * but you could also split the definitions up into separate modules
 * and use this file as a manifest to collect them into one object.
 *
 * (This would let you separate the helper functions associated with
 * particular state changes, but you'd have to remember to
 * update the manifest whenever you added a new state change.)
 *
 * For simplicity, the state changes directly mutate the state
 * rather than constructing and returning the new version.
 * This isn't especially dangerous, since only one state change
 * is called per update, and the state object never leaves the store;
 * only clones of it are returned from getState().
 *
 * If you needed to, with minor tweaks you could have your state changes
 * return a new copy of the state rather than mutating it.
 * They would just be a little noisier.
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
    updateValidation(state.puzzle);
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

function cellsWithValue(cells, value) {
  return cells.filter(cell => cell.value === value).length;
}

function validateCell(puzzle, row, column) {
  if(puzzle[row][column].value === undefined) return;

  const areas = [
    puzzleRow(puzzle, row),
    puzzleColumn(puzzle, column),
    puzzleSector(puzzle, row, column)
  ];

  if(areas.some(area => cellsWithValue(area, puzzle[row][column].value) > 1)) {
    puzzle[row][column].valid = false;
  } else {
    puzzle[row][column].valid = true;
  }
}

function puzzleRow(puzzle, row) {
  return puzzle[row];
}

function puzzleColumn(puzzle, column) {
  return puzzle.map(row => row[column]);
}

function puzzleSector(puzzle, row, column) {
  const columnSector = (column - (column % 3)) / 3;
  const rowSector = (row - (row % 3)) / 3;

  return flatMap(
    puzzle.slice(rowSector * 3, rowSector * 3 + 3),
    row => row.slice(columnSector * 3, columnSector * 3 + 3)
  );
}

function updateValidation(puzzle) {
  puzzle.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) =>
      validateCell(puzzle, rowIndex, columnIndex)
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
