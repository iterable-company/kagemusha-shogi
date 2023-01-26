import React from 'react';
import ReactDOM from 'react-dom/client';
import { Fu , Kyosha, Keima, Gin, Kin, Kaku, Hisha, Gyoku } from './koma';
import './index.css';

function Square(props) {
  var classNames = ["square"];
  if (props.value && props.value.owner === "other") {
    classNames.push("other");
  }
  if (props.value && ["成香","成桂"].includes(props.value.koma.displayName())) {
    classNames.push("promoted-keikyo");
  }

  return (
    <button className={classNames.join(" ")} onClick={props.onClick}>  
      {props.value ? props.value.koma.displayName() : ""}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedIndex: null,
    }
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    if (!this.state.clickedIndex) {
      if (!this.props.squares[i]) {
        return;
      }
      this.setState({
        clickedIndex: i,
      })
      return;
    } 
    const beforeIndex = this.state.clickedIndex;
    const beforeSujiDan = indexToSujiDan(beforeIndex);
    const afterSujiDan = indexToSujiDan(i);
    const koma = this.props.squares[beforeIndex].koma;
    const virticalDiff = beforeSujiDan[1] - afterSujiDan[1];
    const horizontalDiff = afterSujiDan[0] - beforeSujiDan[0];
    if (!koma.canMove(virticalDiff, horizontalDiff)) {
      alert("そこには動かせません！");
      this.setState({
        clickedIndex: null,
      })
      return;
    }
    this.props.onKomaMove(beforeIndex, i);
    this.setState({
      clickedIndex: null,
    })
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
      isAsc: true,
    }
  }

  handleKomaMove(beforeIndex, afterIndex) {
    const history = this.state.history.slice();
    history.push({beforeIndex: beforeIndex, afterIndex: afterIndex});
    this.setState({
      history: history,
    })
  }

  render() {
    const init = this.initial.slice();
    const history = this.state.history.slice();
    const currentSquare = calculateCurrentSquares(init, history);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquare}
            onKomaMove={(beforeIndex, afterIndex) => this.handleKomaMove(beforeIndex, afterIndex)}
          />
        </div>
      </div>
    );
  }
}

function indexToSujiDan(index) {
  const suji = 9 - (index % 9);
  const dan = Math.floor(index / 9) + 1;
  return [suji, dan];
}

function sujiDanToIndex(suji, dan) {
  return (dan - 1) * 9 + (9 - suji)
}

function calculateCurrentSquares(init, history) {
  return history.reduce((acc, move) => {
    const beforeIndex = move.beforeIndex;
    const afterIndex = move.afterIndex;
    const value = acc[beforeIndex];
    acc[beforeIndex] = null;
    acc[afterIndex] = value;
    return acc;
  }, init)
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  