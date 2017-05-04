import Initialize from './action-creators/initialize';
import createStore from './flux-store';
import * as stateChanges from './state-changes';

const initialState = {
  loadingPuzzle: false,
  solved: false
}

export default function Sudoku(puzzleGenerator) {
  const store = createStore(initialState, stateChanges);

  return {
    initialize: Initialize(store, puzzleGenerator),

    makeMove: ({row, column, value}) => {
      store.update({
        type: 'MAKE_MOVE',
        row: row,
        column: column,
        value: value
      })
    },

    getState: () => store.getState()
  }
}
