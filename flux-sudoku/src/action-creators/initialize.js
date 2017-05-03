export default (store, puzzleGenerator) =>
  () => {
    store.update({ type: 'INITIALIZE' });

    puzzleGenerator.generate()
      .then(puzzle => store.update({
        type: 'PUZZLE_LOADED',
        puzzle: puzzle
      }));
  }
