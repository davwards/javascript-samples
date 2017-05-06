function transformPuzzle(puzzle) {
  return puzzle.map(row =>
    row.map(cell =>
      cell === undefined
        ? { value: cell, given: false, valid: true }
        : { value: cell, given: true, valid: true }
    )
  );
}

export default function(state, action) {
  state.loadingPuzzle = false;
  state.puzzle = transformPuzzle(action.puzzle);
}
