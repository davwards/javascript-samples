import { flatten } from 'lodash';
import validatePuzzle from './validate-puzzle';

function isSolved(puzzle) {
  return flatten(puzzle)
    .every(cell => cell.value !== undefined && cell.valid);
}

function cellIsFillable(cell) { return !cell.given; }

export default function (state, action) {
  const cell = state.puzzle[action.row][action.column];

  if(cellIsFillable(cell)) {
    cell.value = action.value;
    validatePuzzle(state.puzzle);
  }

  if(isSolved(state.puzzle)) {
    state.solved = true;
  }
}
