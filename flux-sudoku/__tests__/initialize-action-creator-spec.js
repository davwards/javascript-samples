import Initialize from '../src/action-creators/initialize';
import FakePromise from '../__fakes__/fake-promise';

describe('initialize action creator', () => {
  let store, promisedPuzzle, initialize;

  beforeEach(() => {
    promisedPuzzle = new FakePromise();
    store = { update: jest.fn() };
    const stubPuzzleGenerator = { generate: () => promisedPuzzle };

    initialize = Initialize(store, stubPuzzleGenerator);
  });

  it('sends an INITIALIZE action to the store', () => {
    initialize();
    expect(store.update).toHaveBeenCalledWith({ type: 'INITIALIZE' });
  });

  it('sends a PUZZLE_LOADED action when the puzzle from the generator resolves', () => {
    initialize();
    promisedPuzzle.resolveWith('the-puzzle');

    expect(store.update).toHaveBeenCalledWith({
      type: 'PUZZLE_LOADED',
      puzzle: 'the-puzzle'
    });
  });
});


