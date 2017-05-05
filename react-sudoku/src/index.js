import React from 'react';
import ReactDOM from 'react-dom';
import App from './gui/App';
import { Sudoku, FakePuzzleGenerator } from 'flux-sudoku';

const sudoku = Sudoku(new FakePuzzleGenerator());

ReactDOM.render(
  <App sudoku={sudoku}/>,
  document.getElementById('root')
);
