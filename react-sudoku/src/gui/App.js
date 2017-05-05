import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.sudoku.getState();
  }

  startButtonClicked() {
    this.props.sudoku.initialize();
  }

  render() {
    return (<div>
        { this.state.puzzle && <div role="grid"></div> }
        { this.state.loadingPuzzle && <p>LOADING PUZZLE</p> }
        { this.state.loadingPuzzle || <button onClick={this.startButtonClicked.bind(this)}>START</button> }
      </div>
    );
  }
}

export default App;
