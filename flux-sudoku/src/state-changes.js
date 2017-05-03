function transformPuzzle(puzzle) {
  return puzzle.map(row =>
    row.map(cell =>
      cell === undefined
        ? { value: cell, given: false, valid: true }
        : { value: cell, given: true, valid: true }
    )
  );
}

export default {

  INITIALIZE: (state) => { state.loadingPuzzle = true; },

  PUZZLE_LOADED: (state, action) => {
    state.loadingPuzzle = false;
    state.puzzle = transformPuzzle(action.puzzle);
  },

  MAKE_MOVE: (state, action) => { state.puzzle[action.row][action.column].value = action.value; }

}
