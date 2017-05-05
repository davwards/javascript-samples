import { cloneDeep } from 'lodash';

/* This function creates a flux store with
 * the given initial state and set of state changes.
 *
 * (A state change is a function that defines how
 * the state should change for a particular action type.)
 *
 * When the update function is called with an action,
 * the action is passed with the current state into
 * the corresponding state change function if there is one.
 *
 * The state change function is expected to modify the
 * state appropriately for the given action. This happens
 * synchronously; any asynchronous work doesn't happen
 * in the state changes, but instead in action creators
 * which call update on the store at appropriate moments.
 *
 * After the state change function has run,
 * all the subscribed callbacks are called.
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
