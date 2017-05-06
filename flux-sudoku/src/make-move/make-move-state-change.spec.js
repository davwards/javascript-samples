import MAKE_MOVE from '../../src/make-move/make-move-state-change';

function blank() {
  return {value: undefined, given: false, valid: true};
}

function given(value) {
  return {value: value, given: true, valid: true};
}

function filled(value) {
  return {value: value, given: false, valid: true};
}

function invalid(value) {
  return {value: value, given: false, valid: false};
}

describe('MAKE_MOVE state change', () => {
  describe('on an empty space with no conflicts', () => {
    it('sets the space to the given value', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 1,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][1].value).toBe(1);
    });
  });

  describe('on a given space', () => {
    it('does not change the value', () => {
      const state = {
        puzzle: [
          [blank(), given(9), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 1,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][1].value).toBe(9);
      expect(state.puzzle[0][1].given).toBe(true);
    });
  });

  describe('on a previously filled space with no conflicts', () => {
    it('changes the value', () => {
      const state = {
        puzzle: [
          [blank(), filled(9), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 1,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][1]).toEqual({
        value: 1,
        given: false,
        valid: true
      });
    });
  });

  describe('on a space with a conflict in the row', () => {
    it('changes the value but marks the conflicting spaces as invalid', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), filled(1), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 0,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][0]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
      expect(state.puzzle[0][3]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
    });

    it('leaves unaffected cells marked as valid', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), filled(1), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 0,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][1]).toEqual({
        value: undefined,
        given: false,
        valid: true
      });

    });
  });

  describe('on a space with a conflict in the column', () => {
    it('changes the value but marks the conflicting spaces as invalid', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [filled(1), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 0,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[0][0]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
      expect(state.puzzle[3][0]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
    });
  });

  describe('on a space with a conflict in the sector', () => {
    it('changes the value but marks the conflicting spaces as invalid', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), filled(1), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 4,
        column: 4,
        value: 1
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[4][4]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
      expect(state.puzzle[3][3]).toEqual({
        value: 1,
        given: false,
        valid: false
      });
    });
  });

  describe('when the move resolves existing conflicts', () => {
    it('changes the value and marks the resolved conflicts as valid', () => {
      const state = {
        puzzle: [
          [blank(), blank(), blank(), blank(), invalid(1), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), invalid(1), blank(), blank(), blank(), blank(), blank()],
          [invalid(1), blank(), blank(), blank(), invalid(1), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
          [blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank(), blank()],
        ]
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 4,
        column: 4,
        value: 2
      };

      MAKE_MOVE(state, action);

      expect(state.puzzle[4][4]).toEqual({
        value: 2,
        given: false,
        valid: true
      });
      expect(state.puzzle[3][3]).toEqual({
        value: 1,
        given: false,
        valid: true
      });
      expect(state.puzzle[0][4]).toEqual({
        value: 1,
        given: false,
        valid: true
      });
      expect(state.puzzle[4][0]).toEqual({
        value: 1,
        given: false,
        valid: true
      });
    });
  });

  describe('when all cells are filled and none are invalid', () => {
    it('marks the puzzle solved', () => {
      const state = {
        puzzle: [
          [blank(), filled(4), filled(5), filled(2), filled(3), filled(7), filled(6), filled(8), filled(1)],
          [filled(1), filled(2), filled(6), filled(8), filled(4), filled(9), filled(5), filled(7), filled(3)],
          [filled(8), filled(3), filled(7), filled(1), filled(6), filled(5), filled(4), filled(2), filled(9)],
          [filled(7), filled(6), filled(4), filled(5), filled(9), filled(8), filled(3), filled(1), filled(2)],
          [filled(2), filled(8), filled(3), filled(4), filled(7), filled(1), filled(9), filled(5), filled(6)],
          [filled(5), filled(1), filled(9), filled(6), filled(2), filled(3), filled(8), filled(4), filled(7)],
          [filled(4), filled(7), filled(1), filled(3), filled(8), filled(6), filled(2), filled(9), filled(5)],
          [filled(6), filled(5), filled(2), filled(9), filled(1), filled(4), filled(7), filled(3), filled(8)],
          [filled(3), filled(9), filled(8), filled(7), filled(5), filled(2), filled(1), filled(6), filled(4)],
        ],
        solved: false,
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 0,
        value: 9
      };

      MAKE_MOVE(state, action);

      expect(state.solved).toBe(true);
    });
  });

  describe('when all cells are filled and none are invalid', () => {
    it('marks the puzzle solved', () => {
      const state = {
        puzzle: [
          [blank(), filled(4), invalid(4), filled(2), filled(3), filled(7), filled(6), filled(8), filled(1)],
          [filled(1), filled(2), filled(6), filled(8), filled(4), filled(9), filled(5), filled(7), filled(3)],
          [filled(8), filled(3), filled(7), filled(1), filled(6), filled(5), filled(4), filled(2), filled(9)],
          [filled(7), filled(6), filled(4), filled(5), filled(9), filled(8), filled(3), filled(1), filled(2)],
          [filled(2), filled(8), filled(3), filled(4), filled(7), filled(1), filled(9), filled(5), filled(6)],
          [filled(5), filled(1), filled(9), filled(6), filled(2), filled(3), filled(8), filled(4), filled(7)],
          [filled(4), filled(7), filled(1), filled(3), filled(8), filled(6), filled(2), filled(9), filled(5)],
          [filled(6), filled(5), filled(2), filled(9), filled(1), filled(4), filled(7), filled(3), filled(8)],
          [filled(3), filled(9), filled(8), filled(7), filled(5), filled(2), filled(1), filled(6), filled(4)],
        ],
        solved: false,
      };

      const action = {
        type: 'MAKE_MOVE',
        row: 0,
        column: 0,
        value: 9
      };

      MAKE_MOVE(state, action);

      expect(state.solved).toBe(false);
    });
  });
});
