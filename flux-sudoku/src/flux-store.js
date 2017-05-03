import { cloneDeep } from 'lodash';

export default function createStore(initialState, stateChanges) {
  const state = initialState;

  return {
    update: (action) => {
      if(stateChanges[action.type]) {
        stateChanges[action.type](state, action);
      }
    },

    getState: () => cloneDeep(state)
  }
}
