import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { blank, filled, given, invalid } from '../../__test-support__/cell-builders';

const DOM_ROOT_SELECTOR = 'root';

describe('Sudoku gui', () => {
  beforeEach(prepareDom);

  let sudoku, sudokuState;

  beforeEach(() => {
    sudokuState = {
      puzzle: undefined
    };

    sudoku = {
      getState: () => sudokuState,
      loadPuzzle: jest.fn(),
      makeMove: jest.fn(),
      subscribe: jest.fn()
    };
  });

  it('subscribes to updates from sudoku', () => {
    sudokuState.loadingPuzzle = false;
    renderApp(sudoku);

    expect(sudoku.subscribe).toHaveBeenCalled();

    expect(page()).not.toContain("LOADING PUZZLE");
    sudokuState.loadingPuzzle = true;
    sudoku.subscribe.mock.calls[0][0]();
    expect(page()).toContain("LOADING PUZZLE");
  });

  describe('when the sudoku engine does not contain a puzzle', () => {
    it('shows a START button', () => {
      renderApp(sudoku);

      expect(page()).toContain("START");
    });

    it('does not display a puzzle', () => {
      renderApp(sudoku);

      expect(document.querySelector('[role="grid"]')).toBe(null);
    });

    describe('and the start button is clicked', () => {
      it('calls sudoku.loadPuzzle', () => {
        renderApp(sudoku);
        clickStartButton();
        expect(sudoku.loadPuzzle).toHaveBeenCalled();
      });
    });
  });

  describe('when the sudoku engine contains a puzzle', () => {
    it('shows the puzzle', () => {
      sudokuState.loadingPuzzle = false;
      sudokuState.puzzle = samplePuzzle();
      renderApp(sudoku);

      expect(document.querySelector('[role="grid"]')).not.toBe(null);
    });

    it('does not show a START button', () => {
      sudokuState.loadingPuzzle = false;
      sudokuState.puzzle = samplePuzzle();
      renderApp(sudoku);

      expect(page()).not.toContain("START");
    });
  });

  describe('when the sudoku engine is loading the puzzle', () => {
    it('shows a LOADING message', () => {
      sudokuState.loadingPuzzle = true;
      renderApp(sudoku);

      expect(page()).toContain("LOADING PUZZLE");
    });

    it('does not show a START button', () => {
      sudokuState.loadingPuzzle = true;
      renderApp(sudoku);

      expect(page()).not.toContain("START");
    });
  });

  describe('when the sudoku engine is not loading the puzzle', () => {
    it('shows a LOADING message', () => {
      sudokuState.loadingPuzzle = false;
      renderApp(sudoku);

      expect(page()).not.toContain("LOADING PUZZLE");
    });
  });

  describe('when the puzzle is solved', () => {
    it('shows a SOLVED message', () => {
      sudokuState.solved = true;
      renderApp(sudoku);

      expect(page()).toContain('SOLVED');
    });

    it('disables all inputs', () => {
      sudokuState.solved = true;
      sudokuState.puzzle = samplePuzzle();
      renderApp(sudoku);

      expect(document.querySelectorAll('input:not([disabled])').length).toBe(0);
    });
  });

  describe('when a move is made', () => {
    it('calls sudoku.makeMove', () => {
      sudokuState.puzzle = samplePuzzle();
      renderApp(sudoku);

      const input = document.querySelector('[role="gridcell"] input');
      input.value = '4';
      input.dispatchEvent(new Event('input', {bubbles: true, cancelable: false}))

      expect(sudoku.makeMove).toHaveBeenCalledWith({row: 0, column: 1, value: 4});
    });
  });

  function prepareDom() {
    document.body.innerHTML = `<div id="${DOM_ROOT_SELECTOR}"></div>`;
  }

  function renderApp(sudoku) {
    ReactDOM.render(
      <App sudoku={sudoku} />,
      document.getElementById(DOM_ROOT_SELECTOR)
    );
  }

  function clickStartButton() {
    document.querySelector('button').click();
  }

  function page() {
    return document.body.innerHTML;
  }

  function samplePuzzle() {
    return [
      [given(9), blank(), blank(), given(2), given(3), given(7), given(6), given(8), blank()],
      [blank(), given(2), blank(), given(8), given(4), blank(), blank(), given(7), given(3)],
      [given(8), blank(), given(7), given(1), blank(), given(5), blank(), given(2), given(9)],
      [blank(), blank(), given(4), given(5), given(9), given(8), given(3), blank(), blank()],
      [given(2), blank(), blank(), blank(), blank(), given(1), blank(), blank(), given(6)],
      [given(5), given(1), blank(), blank(), blank(), blank(), blank(), given(4), given(7)],
      [given(4), blank(), given(1), given(3), blank(), given(6), given(2), given(9), given(5)],
      [blank(), given(5), blank(), given(9), given(1), blank(), given(7), given(3), given(8)],
      [given(3), blank(), given(8), blank(), given(5), blank(), blank(), blank(), blank()],
    ];
  }
});
