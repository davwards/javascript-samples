import React from 'react';
import { range, merge } from 'lodash';
import Cell from './Cell';

const nineOf = (fn) => range(9).map(fn);

const makeMoveHandlerForCell = (row, column, makeMove) => (value) =>
  makeMove({row, column, value});

const rowStyles = {
  2: { borderBottom: 'solid black 2px' },
  5: { borderBottom: 'solid black 2px' },
};

const columnStyles = {
  2: { borderRight: 'solid black 2px' },
  5: { borderRight: 'solid black 2px' },
};

export default (props) => <table role='grid' style={{width: 'auto', borderCollapse: 'collapse'}}><tbody>
  { nineOf(row =>
    <tr role="row" key={'row-' + row}>
      { nineOf(column =>
        <Cell
          key={'cell-' + row + '-' + column}
          data={props.grid[row][column]}
          style={merge({}, columnStyles[column], rowStyles[row])}
          makeMove={makeMoveHandlerForCell(row, column, props.makeMove)}
        />
      ) }
    </tr>
  ) }
</tbody></table>

