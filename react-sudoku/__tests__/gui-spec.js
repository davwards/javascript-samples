import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/gui/App';
import { blank, filled, given, invalid } from '../__test-support__/cell-builders';

const DOM_ROOT_SELECTOR = 'root';

describe('Sudoku gui', () => {
  beforeEach(prepareDom);

  describe('when the sudoku engine does not contain a puzzle', () => {
    it('shows a START button', () => {
      renderApp({
        getState: () => ({ puzzle: undefined })
      });

      expect(page()).toContain("START");
    });

    it('does not display a puzzle', () => {
      renderApp({
        getState: () => ({ puzzle: undefined })
      });

      expect(document.querySelector('[role="grid"]')).toBe(null);
    });

    describe('and the start button is clicked', () => {
      it('calls sudoku.initialize', () => {
        let sudoku = {
          getState: () => ({ puzzle: undefined }),
          initialize: jest.fn()
        }

        renderApp(sudoku);
        clickStartButton();
        expect(sudoku.initialize).toHaveBeenCalled();
      });
    });
  });

  describe('when the sudoku engine contains a puzzle', () => {
    it('shows the puzzle', () => {
      renderApp({
        getState: () => ({ puzzle: samplePuzzle(), loadingPuzzle: false })
      });

      expect(document.querySelector('[role="grid"]')).not.toBe(null);
    });
  });


  describe('when the sudoku engine is loading the puzzle', () => {
    it('shows a LOADING message', () => {
      renderApp({
        getState: () => ({ loadingPuzzle: true })
      });

      expect(page()).toContain("LOADING PUZZLE");
    });

    it('does not show a START button', () => {
      renderApp({
        getState: () => ({ loadingPuzzle: true })
      });

      expect(page()).not.toContain("START");
    });
  });

  describe('when the sudoku engine is not loading the puzzle', () => {
    it('shows a LOADING message', () => {
      renderApp({
        getState: () => ({ loadingPuzzle: false })
      });

      expect(page()).not.toContain("LOADING PUZZLE");
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
