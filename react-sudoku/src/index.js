import React from 'react';
import ReactDOM from 'react-dom';
import App from './gui/App';
import { Sudoku } from 'flux-sudoku';
import { localPuzzleGenerator } from 'local-puzzle-generator';

const sudoku = Sudoku(localPuzzleGenerator);

ReactDOM.render(
  <App sudoku={sudoku}/>,
  document.getElementById('root')
);
