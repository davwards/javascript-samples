import React, { Component } from 'react';
import Grid from './Grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.sudoku.getState();
    props.sudoku.subscribe(this.update.bind(this));
  }

  componentDidMount() {
    this.props.sudoku.loadPuzzle();
  }

  update() {
    this.setState(this.props.sudoku.getState());
  }

  loadPuzzleButtonClicked() {
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

  loadPuzzleButton() {
    return this.state.loadingPuzzle ||
      <button onClick={this.loadPuzzleButtonClicked.bind(this)}>LOAD PUZZLE</button>;
  }

  render() {
    return (<div>
      { this.grid() }
      { this.loadingMessage() }
      { this.solvedMessage() }
      { this.loadPuzzleButton() }
    </div>);
  }
}

export default App;
