import React from 'react';
import { range } from 'lodash';
import Cell from './cell';

function nineOf(fn) {
  return range(9).map(fn);
}

const rowOfCells = (grid) => (row) =>
  <div role="row" key={'row-' + row}>
    { nineOf(cell(grid, row)) }
  </div>;

const cell = (grid, row) => (column) =>
  <Cell key={'cell-' + row + '-' + column} data={grid[row][column]}/>

export default (props) => <div>
  { nineOf(rowOfCells(props.grid)) }
</div>
