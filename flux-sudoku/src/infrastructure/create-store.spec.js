import createStore from '../../src/infrastructure/create-store';

describe('flux store', () => {
  describe('given an action for which there is a state change', () => {
    let store, stateChanges, initialState;

    beforeEach(() => {
      stateChanges = {
        KNOWN_ACTION: jest.fn()
      };

      initialState = 'the-initial-state';

      store = createStore(initialState, stateChanges);
    });

    it('calls the state change with the current state and the action', () => {
      const action = {type: 'KNOWN_ACTION'};
      store.update(action);
      expect(stateChanges.KNOWN_ACTION).toHaveBeenCalledWith('the-initial-state', action);
    });

    it('invokes the subscribed callbacks after the state has changed', () => {
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();
      store.subscribe(subscriber1);
      store.subscribe(subscriber2);

      store.update({type: 'KNOWN_ACTION'});

      expect(subscriber1).toHaveBeenCalled();
      expect(subscriber2).toHaveBeenCalled();
    });
  });

  describe('given an action for which there is no state change', () => {
    let store, stateChanges, initialState;

    beforeEach(() => {
      stateChanges = {
        KNOWN_ACTION: jest.fn()
      };

      initialState = 'the-initial-state';

      store = createStore(initialState, stateChanges);
    });

    it('does not invoke the subscribed callbacks after the state has changed', () => {
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      store.update({type: 'UNKNOWN_ACTION'});

      expect(subscriber).not.toHaveBeenCalled();
    });
  });
});
