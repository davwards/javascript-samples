import LoadPuzzle from '../../src/load-puzzle/load-puzzle-action-creator';
import FakePromise from '../../__fakes__/fake-promise';

describe('loadPuzzle action creator', () => {
  let dispatch, promisedPuzzle, loadPuzzle;

  beforeEach(() => {
    promisedPuzzle = new FakePromise();
    dispatch = jest.fn();
    const stubPuzzleGenerator = { generate: () => promisedPuzzle };

    loadPuzzle = LoadPuzzle(dispatch, stubPuzzleGenerator);
  });

  it('sends a LOADING_PUZZLE action to the store', () => {
    loadPuzzle();
    expect(dispatch).toHaveBeenCalledWith({ type: 'LOADING_PUZZLE' });
  });

  it('sends a PUZZLE_LOADED action when the puzzle from the generator resolves', () => {
    loadPuzzle();
    promisedPuzzle.resolveWith('the-puzzle');

    expect(dispatch).toHaveBeenCalledWith({
      type: 'PUZZLE_LOADED',
      puzzle: 'the-puzzle'
    });
  });
});


