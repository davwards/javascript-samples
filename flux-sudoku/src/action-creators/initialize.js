/* This module exports a function which builds
 * the "initialize" action creator.
 *
 * An action creator is a function whose job is
 * to dispatch actions, and to do any work necessary
 * to decide what actions to send.
 *
 * In the case of the initialize action creator,
 * it first dispatches the INITIALIZE action,
 * then requests a puzzle from the puzzle generator.
 * Once the puzzle arrives, it dispatches a
 * PUZZLE_LOADED action containing the new puzzle.
 *
 * Action creators like this can handle all the
 * asynchronous work of your application, dispatching
 * actions at the appropriate moments in the chain
 * of events to keep the application up to date.
 */
export default (store, puzzleGenerator) =>
  () => {
    store.update({ type: 'INITIALIZE' });

    puzzleGenerator.generate()
      .then(puzzle => store.update({
        type: 'PUZZLE_LOADED',
        puzzle: puzzle
      }));
  }
