import React, { Component } from 'react';
import Grid from './Grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.sudoku.getState();
    props.sudoku.subscribe(this.update.bind(this));
  }

  update() {
    this.setState(this.props.sudoku.getState());
  }

  startButtonClicked() {
    this.props.sudoku.loadPuzzle();
  }

  grid() {
    return this.state.puzzle &&
      <Grid
        grid={this.state.puzzle}
        makeMove={this.props.sudoku.makeMove}
        solved={this.state.solved}
      />;
  }

  loadingMessage() {
    return this.state.loadingPuzzle &&
      <p>LOADING PUZZLE</p>;
  }

  solvedMessage() {
    return this.state.solved &&
      <p>SOLVED</p>;
  }

  startButton() {
    return this.state.loadingPuzzle || !!this.state.puzzle ||
      <button onClick={this.startButtonClicked.bind(this)}>START</button>;
  }

  render() {
    return (<div>
      { this.grid() }
      { this.loadingMessage() }
      { this.solvedMessage() }
      { this.startButton() }
    </div>);
  }
}

export default App;
