import Initialize from '../../src/action-creators/initialize';
import FakePromise from '../../__fakes__/fake-promise';

describe('initialize action creator', () => {
  let dispatch, promisedPuzzle, initialize;

  beforeEach(() => {
    promisedPuzzle = new FakePromise();
    dispatch = jest.fn();
    const stubPuzzleGenerator = { generate: () => promisedPuzzle };

    initialize = Initialize(dispatch, stubPuzzleGenerator);
  });

  it('sends an INITIALIZE action to the store', () => {
    initialize();
    expect(dispatch).toHaveBeenCalledWith({ type: 'INITIALIZE' });
  });

  it('sends a PUZZLE_LOADED action when the puzzle from the generator resolves', () => {
    initialize();
    promisedPuzzle.resolveWith('the-puzzle');

    expect(dispatch).toHaveBeenCalledWith({
      type: 'PUZZLE_LOADED',
      puzzle: 'the-puzzle'
    });
  });
});


