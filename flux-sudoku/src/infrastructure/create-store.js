import { cloneDeep } from 'lodash';

/* This function creates a flux store with
 * the given initial state and set of state changes.
 *
 * A state change is a function that modifies the state
 * appropriately for a particular action type.
 * This happens synchronously; any asynchronous work
 * doesn't happen in the state changes, but instead
 * in action creators which dispatch actions
 * at appropriate moments.
 *
 * The getState function returns a deep clone of the state,
 * to prevent consumers from inadvertently affecting others
 * by modifying it. */

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
