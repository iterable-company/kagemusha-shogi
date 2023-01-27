import React, { useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Fu , Kyosha, Keima, Gin, Kin, Kaku, Hisha, Gyoku } from './koma';
import { Player } from './player';
import './index.css';

function Square(props) {
  var classNames = ["square"];
  if (props.value && props.value.owner != props.player) {
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
    var index = -1;
    if (this.props.player === Player.first) {index = i;}
    else {index = 80 - i;}
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.handleClick(index)}
        player={this.props.player}
      />
    );
  }

  yesPromote() { this.promote = true; this.setState({showPromoteDialog: false});}
  noPromote() { this.promote = false; this.setState({showPromoteDialog: false});}

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
    const afterIndex = i;
    const beforeSujiDan = indexToSujiDan(beforeIndex);
    const afterSujiDan = indexToSujiDan(afterIndex);
    const koma = this.props.squares[beforeIndex].koma;
    var coeff = 0;
    if (this.props.player === Player.first) { coeff = 1; }
    else { coeff = -1; }
    const virticalDiff = coeff * (beforeSujiDan[1] - afterSujiDan[1]);
    const horizontalDiff = coeff * (afterSujiDan[0] - beforeSujiDan[0]);
    if (!koma.canMove(virticalDiff, horizontalDiff)) {
      alert("そこには動かせません！");
      this.setState({
        clickedIndex: null,
      })
      return;
    }
    this.promote = false;
    if (canPromote(this.props.player, koma, beforeIndex, afterIndex)) {
      this.promote = window.confirm("成りますか？");
    }
    this.props.onKomaMove(beforeIndex, i, this.promote);
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
      </div>
    );
  }
}

class Game extends React.Component {
  initial = [
    {owner: Player.second, koma: new Kyosha()},{owner: Player.second, koma: new Keima()},{owner: Player.second, koma: new Gin()},{owner: Player.second, koma: new Kin()},{owner: Player.second, koma: new Gyoku()},{owner: Player.second, koma: new Kin()},{owner: Player.second, koma: new Gin()},{owner: Player.second, koma: new Keima()},{owner: Player.second, koma: new Kyosha()},
    null,{owner: Player.second, koma: new Hisha()},null,null,null,null,null,{owner: Player.second, koma: new Kaku()},null,
    {owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},{owner: Player.second, koma: new Fu()},
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,
    {owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},{owner: Player.first, koma: new Fu()},
    null,{owner: Player.first, koma: new Kaku()},null,null,null,null,null,{owner: Player.first, koma: new Hisha()},null,
    {owner: Player.first, koma: new Kyosha()},{owner: Player.first, koma: new Keima()},{owner: Player.first, koma: new Gin()},{owner: Player.first, koma: new Kin()},{owner: Player.first, koma: new Gyoku()},{owner: Player.first, koma: new Kin()},{owner: Player.first, koma: new Gin()},{owner: Player.first, koma: new Keima()},{owner: Player.first, koma: new Kyosha()}
  ];
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    }
  }

  handleKomaMove(beforeIndex, afterIndex, promote) {
    const history = this.state.history.slice();
    history.push({beforeIndex: beforeIndex, afterIndex: afterIndex, promote: promote});
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
            onKomaMove={(beforeIndex, afterIndex, promote) => this.handleKomaMove(beforeIndex, afterIndex, promote)}
            player={Player.first}
          />
          <br />
          <Board
            squares={currentSquare}
            onKomaMove={(beforeIndex, afterIndex, promote) => this.handleKomaMove(beforeIndex, afterIndex, promote)}
            player={Player.second}
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
    const promote = move.promote;
    const value = acc[beforeIndex];
    if (promote) {
      value.koma.promote();
    }
    acc[beforeIndex] = null;
    acc[afterIndex] = value;
    return acc;
  }, init)
}

function canPromote(player, koma, beforeIndex, afterIndex) {
  if (!koma.canPromote()) return false;
  if (isPromotedIndex(player, afterIndex)) return true;
  if (isPromotedIndex(player, beforeIndex)) return true;
  return false;
}

function isPromotedIndex(player, index) {
  const dan = indexToSujiDan(index)[1];
  if (player == Player.first && (1 <= dan && dan <= 3)) return true;
  if (player == Player.second && (7 <= dan && dan <= 9)) return true;
  return false; 
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  