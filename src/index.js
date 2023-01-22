import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className={"square" + (props.value && props.value.id === "other" ? " other" : "")} onClick={() => ""} >  
      {props.value ? props.value.value : ""}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    console.log("i: " + i + ", squares[i]: " + this.props.squares[i]);
    return (
      <Square
        value={this.props.squares[i]}
      />
    );
  }

  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i+1)}
        {this.renderSquare(i+2)}
        {this.renderSquare(i+3)}
        {this.renderSquare(i+4)}
        {this.renderSquare(i+5)}
        {this.renderSquare(i+6)}
        {this.renderSquare(i+7)}
        {this.renderSquare(i+8)}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(9)}
        {this.renderRow(18)}
        {this.renderRow(27)}
        {this.renderRow(36)}
        {this.renderRow(45)}
        {this.renderRow(54)}
        {this.renderRow(63)}
        {this.renderRow(72)}
      </div>
    );
  }
}

class Game extends React.Component {
  initial = [
    {id: 'other', value: '香'},{id: 'other', value: '桂'},{id: 'other', value: '銀'},{id: 'other', value: '金'},{id: 'other', value: '玉'},{id: 'other', value: '金'},{id: 'other', value: '銀'},{id: 'other', value: '桂'},{id: 'other', value: '香'},
    null,{id: 'other', value: '飛'},null,null,null,null,null,{id: 'other', value: '角'},null,
    {id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},{id: 'other', value: '歩'},
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    {id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},{id: 'mine', value: '歩'},
    null,{id: 'mine', value: '角'},null,null,null,null,null,{id: 'mine', value: '飛'},null,
    {id: 'mine', value: '香'},{id: 'mine', value: '桂'},{id: 'mine', value: '銀'},{id: 'mine', value: '金'},{id: 'mine', value: '玉'},{id: 'mine', value: '金'},{id: 'mine', value: '銀'},{id: 'mine', value: '桂'},{id: 'mine', value: '香'}
  ];
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      stepNumber: 0,
      isAsc: true,
    }
  }

  render() {
    const currentSquare = this.initial.slice();
    console.log(currentSquare)

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquare}
          />
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  