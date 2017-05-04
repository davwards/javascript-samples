import Sudoku from '../src/sudoku';
import FakePromise from '../__fakes__/fake-promise';

test('Playing a game of sudoku', () => {
  const promisedPuzzle = new FakePromise();
  const puzzleGenerator = { generate: () => promisedPuzzle };

  const sudoku = Sudoku(puzzleGenerator);
  expect(sudoku.getState().loadingPuzzle).toBe(false);
  expect(sudoku.getState().solved).toBe(false);

  sudoku.initialize();
  expect(sudoku.getState().loadingPuzzle).toBe(true);
  expect(sudoku.getState().puzzle).toBe(undefined);

  promisedPuzzle.resolveWith([
    [9, undefined, undefined,2,3,7,6,8,undefined],
    [undefined,2,undefined,8,4,undefined,undefined,7,3],
    [8,undefined,7,1,undefined,5,undefined,2,9],
    [undefined,undefined,4,5,9,8,3,undefined,undefined],
    [2,undefined,undefined,undefined,undefined,1,undefined,undefined,6],
    [5,1,undefined,undefined,undefined,undefined,undefined,4,7],
    [4,undefined,1,3,undefined,6,2,9,5],
    [undefined,5,undefined,9,1,undefined,7,3,8],
    [3,undefined,8,undefined,5,undefined,undefined,undefined,undefined],
  ]);
  expect(sudoku.getState().loadingPuzzle).toBe(false);
  expect(sudoku.getState().puzzle[0][0]).toEqual({
    value: 9,
    given: true,
    valid: true
  });
  expect(sudoku.getState().puzzle[1][0]).toEqual({
    value: undefined,
    given: false,
    valid: true
  });

  sudoku.makeMove({row: 1, column: 0, value: 1});
  expect(sudoku.getState().puzzle[1][0]).toEqual({
    value: 1,
    given: false,
    valid: true
  });

  sudoku.makeMove({row: 3, column: 0, value: 1});
  expect(sudoku.getState().puzzle[3][0]).toEqual({
    value: 1,
    given: false,
    valid: false
  });
});
