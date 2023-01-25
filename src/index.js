import React from 'react';
import ReactDOM from 'react-dom/client';
import { Fu , Kyosha, Keima, Gin, Kin, Kaku, Hisha, Gyoku } from './koma';
import './index.css';

function Square(props) {
  console.log("props: " + JSON.stringify(props))
  return (
    <button className={"square" + (props.value && props.value.owner === "other" ? " other" : "") + (props.value && ["成香","成桂"].includes(props.value.koma.displayName()) ? " promoted-keikyo" : "")} onClick={() => ""} >  
      {props.value ? props.value.koma.displayName() : ""}
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
    {owner: 'other', koma: new Kyosha()},{owner: 'other', koma: new Keima()},{owner: 'other', koma: new Gin()},{owner: 'other', koma: new Kin()},{owner: 'other', koma: new Gyoku()},{owner: 'other', koma: new Kin()},{owner: 'other', koma: new Gin()},{owner: 'other', koma: new Keima()},{owner: 'other', koma: new Kyosha()},
    null,{owner: 'other', koma: new Hisha()},null,null,null,null,null,{owner: 'other', koma: new Kaku()},null,
    {owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},{owner: 'other', koma: new Fu()},
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    {owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},{owner: 'mine', koma: new Fu()},
    null,{owner: 'mine', koma: new Kaku()},null,null,null,null,null,{owner: 'mine', koma: new Hisha()},null,
    {owner: 'mine', koma: new Kyosha()},{owner: 'mine', koma: new Keima()},{owner: 'mine', koma: new Gin()},{owner: 'mine', koma: new Kin()},{owner: 'mine', koma: new Gyoku()},{owner: 'mine', koma: new Kin()},{owner: 'mine', koma: new Gin()},{owner: 'mine', koma: new Keima()},{owner: 'mine', koma: new Kyosha()}
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

function indexToSujowneran(index) {
  const suji = 9 - (index % 9);
  const dan = index / 9 + 1;
  return [suji, dan];
}

function sujowneranToIndex(suji, dan) {
  return (dan - 1) * 9 + (9 - suji)
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  