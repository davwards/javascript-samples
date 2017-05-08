import Sudoku from '../src/sudoku';
import FakePromise from '../__fakes__/fake-promise';

let sudoku, promisedPuzzle;

test('Playing a game of sudoku', () => {
  promisedPuzzle = new FakePromise();
  sudoku = Sudoku({ generate: () => promisedPuzzle });

  sudokuHasInitialState();

  whenILoadAPuzzle();
  sudokuShowsThatThePuzzleIsLoading();

  whenThePuzzleLoads();
  sudokuDisplaysTheLoadedPuzzle();

  whenIMakeAValidMove();
  sudokuShowsMyMoveInThePuzzle();

  whenIMakeAnInvalidMove();
  sudokuShowsMyMoveIsInvalid();
});

function sudokuHasInitialState() {
  expect(state().loadingPuzzle).toBe(false);
  expect(state().solved).toBe(false);
}

function whenILoadAPuzzle() {
  sudoku.loadPuzzle();
}

function sudokuShowsThatThePuzzleIsLoading() {
  expect(state().loadingPuzzle).toBe(true);
  expect(state().puzzle).toBe(undefined);
}

function whenThePuzzleLoads() {
  promisedPuzzle.resolveWith(samplePuzzle());
}

function sudokuDisplaysTheLoadedPuzzle() {
  expect(state().loadingPuzzle).toBe(false);
  expect(cell(0,0)).toEqual({
    value: 9,
    given: true,
    valid: true
  });
  expect(cell(1,0)).toEqual({
    value: undefined,
    given: false,
    valid: true
  });
}

function whenIMakeAValidMove() {
  sudoku.makeMove({row: 1, column: 0, value: 1});
}

function sudokuShowsMyMoveInThePuzzle() {
  expect(cell(1,0)).toEqual({
    value: 1,
    given: false,
    valid: true
  });
}

function whenIMakeAnInvalidMove() {
  sudoku.makeMove({row: 3, column: 0, value: 1});
}

function sudokuShowsMyMoveIsInvalid() {
  expect(cell(3,0)).toEqual({
    value: 1,
    given: false,
    valid: false
  });
}

function cell(row, column) {
  return sudoku.getState().puzzle[row][column];
}

function state() {
  return sudoku.getState();
}

function samplePuzzle() {
  return [
    [9, undefined, undefined,2,3,7,6,8,undefined],
    [undefined,2,undefined,8,4,undefined,undefined,7,3],
    [8,undefined,7,1,undefined,5,undefined,2,9],
    [undefined,undefined,4,5,9,8,3,undefined,undefined],
    [2,undefined,undefined,undefined,undefined,1,undefined,undefined,6],
    [5,1,undefined,undefined,undefined,undefined,undefined,4,7],
    [4,undefined,1,3,undefined,6,2,9,5],
    [undefined,5,undefined,9,1,undefined,7,3,8],
    [3,undefined,8,undefined,5,undefined,undefined,undefined,undefined],
  ];
}
