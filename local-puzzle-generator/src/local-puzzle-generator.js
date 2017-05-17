import sudoku from 'sudoku';
import chunk from 'lodash.chunk';

export default {
  generate: () => {
    let rawPuzzle = sudoku.makepuzzle()
      .map(number => number ? number : undefined);

    return Promise.resolve(chunk(rawPuzzle, 9));
  }
};
