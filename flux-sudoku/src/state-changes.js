import { flatMap, flatten } from 'lodash';

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
