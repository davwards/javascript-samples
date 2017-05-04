import React from 'react';
import { range } from 'lodash';

function nine(fn) {
  return range(9).map(fn);
}

const Cell = (props) => <div role="gridcell"> {props.data.value} </div>;

const row = (grid) => (rowNumber) =>
  <div role="row" key={'row-' + rowNumber}>
    { nine(cell(grid, rowNumber)) }
  </div>;

const cell = (grid, r) => (c) =>
  <Cell key={'cell-' + r + '-' + c} data={grid[r][c]}/>

export default (props) => <div>
  { nine(row(props.grid)) }
</div>
