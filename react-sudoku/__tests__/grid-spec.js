import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../src/gui/Grid';
import { blank, filled, given, invalid } from '../__test-support__/cell-builders';
import { random, times } from 'lodash';

const DOM_ROOT_SELECTOR = "root";

describe('Grid component', () => {
  beforeEach(prepareDom);

  it('displays each cell in the grid', () => {
    const puzzle = samplePuzzle();
    renderApp(puzzle);

    expect(document.querySelectorAll('[role="gridcell"]').length).toBe(81);

    times(20, () => {
      const row = random(8);
      const column = random(8);
      const cellOfInterest = puzzle[row][column];

      expect(cell(row, column).innerHTML).toContain(String(cellOfInterest.value || ''));
    });
  });

  function prepareDom() {
    document.body.innerHTML = `<div id="${DOM_ROOT_SELECTOR}"></div>`;
  }

  function cell(row, column) {
    return document.querySelector(
      `[role="row"]:nth-child(${row+1}) [role="gridcell"]:nth-child(${column+1})`
    );
  }

  function renderApp(grid) {
    ReactDOM.render(
      <Grid grid={grid} />,
      document.getElementById(DOM_ROOT_SELECTOR)
    );
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
