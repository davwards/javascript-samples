import { flatMap } from 'lodash';

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

export default function validatePuzzle(puzzle) {
  puzzle.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) =>
      validateCell(puzzle, rowIndex, columnIndex)
    )
  );
}

