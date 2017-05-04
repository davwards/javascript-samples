import { cloneDeep } from 'lodash';

export default function createStore(initialState, stateChanges) {
  const state = initialState;
  const subscribers = [];

  return {
    update: (action) => {
      if(stateChanges[action.type]) {
        stateChanges[action.type](state, action);
        subscribers.forEach(subscriber => subscriber());
      }
    },

    subscribe: (subscriber) => subscribers.push(subscriber),

    getState: () => cloneDeep(state)
  }
}
