import React  from 'react';
import ReactDOM from 'react-dom/client';
import { Fu , Kyosha, Keima, Gin, Kin, Kaku, Hisha, Gyoku } from './koma';
import { Player } from './player';
import './index.css';

function Square(props) {
  function notYourTurn() {
    window.alert("あなたの手番ではありません。");
  }
  var classNames = ["square"];
  if (props.value && props.value.owner !== props.player) {
    classNames.push("other");
  }
  if (props.value && ["成香","成桂"].includes(props.value.koma.displayName())) {
    classNames.push("promoted-keikyo");
  }
  if (props.isKagemusha) {
    classNames.push("kagemusha");
  }

  const onClickHandler = props.player === props.turn ? props.onClick : notYourTurn;
  return (
    <button className={classNames.join(" ")} onClick={onClickHandler}>  
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
    const index = getIndex(this.props.player, i);
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.handleClick(index)}
        player={this.props.player}
        isKagemusha={this.props.kagemusha === index}
        turn={this.props.turn}
      />
    );
  }

  handleClickWhenNotClicked(i) {
    if (!this.props.squares[i]) {
      window.alert("駒を選択してください。")
      return;
    }
    if (this.props.squares[i].owner !== this.props.player) {
      window.alert("敵の駒は選択できません。")
      return;
    }
    if (!this.props.kagemusha) {
      window.alert(this.props.player + ": 影武者が選択されました。");
      this.props.onKagemushaSelected(i);
      return;
    }
    this.setState({
      clickedIndex: i,
    })
  }

  handleClickWhenAlreadyClicked(i) {
    const beforeIndex = this.state.clickedIndex;
    const afterIndex = i;
    const beforeSujiDan = indexToSujiDan(beforeIndex);
    const afterSujiDan = indexToSujiDan(afterIndex);
    const koma = this.props.squares[beforeIndex].koma;
    const coeff = this.getCoeff(this.props.player);
    const virticalDiff = coeff * (beforeSujiDan[1] - afterSujiDan[1]);
    const horizontalDiff = coeff * (afterSujiDan[0] - beforeSujiDan[0]);

    if (
      !koma.canMove(virticalDiff, horizontalDiff) || 
      (this.props.squares[afterIndex] && this.props.squares[afterIndex].owner === this.props.player)
    ) {
      alert("そこには動かせません！");
      this.setState({
        clickedIndex: null,
      })
      return;
    }
    var promote = false;
    if (canPromote(this.props.player, koma, beforeIndex, afterIndex)) {
      promote = window.confirm("成りますか？");
    }
    this.props.onKomaMove(beforeIndex, i, promote);
    this.setState({
      clickedIndex: null,
    })
  }

  getCoeff(player) {
    if (player === Player.first) { return 1; }
    else { return -1; }
  }

  handleClick(i) {
    if (this.props.winner) return;
    if (!this.state.clickedIndex) {
      this.handleClickWhenNotClicked(i);
      return;
    }
    this.handleClickWhenAlreadyClicked(i)
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
    var information = "";
    if (this.props.winner) { information = `Player: ${this.props.winner} の勝利です。`}
    else if (this.props.turn !== this.props.player) {information = "相手番です。";}
    else if (!this.props.kagemusha) {information = "影武者を選んでください"}
    else {information = "あなたの手番です。"}
    return (
      <div>
        <p>{information}</p>
        <div className='container'>
          <div className='other-koma-dai'>後手番の駒台</div>
          <div className='board'>
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
          <div className='koma-dai'>先手番の駒台</div>
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
      turn: Player.first,
      kagemusha: {first: null, second: null},
      winner: null,
    }
  }

  handleKomaMove(beforeIndex, afterIndex, promote, player) {
    const winner = getWinnerIfExist(player, this.state.kagemusha, afterIndex);
    if (winner) {
      this.setState({
        winner: winner,
      })
    }
    const init = this.initial.slice();
    const history = this.state.history.slice();
    const currentSquare = calculateCurrentSquares(init, history);
    const kagemusha = getUpdatedKagemusha(player, this.state.kagemusha, currentSquare, beforeIndex, afterIndex);

    history.push({beforeIndex: beforeIndex, afterIndex: afterIndex, promote: promote});

    this.setState({
      history: history,
      turn: this.state.turn === Player.first ? Player.second : Player.first,
      kagemusha: kagemusha,
    })
  }

  handleKagemushaSelected(player, i) {
    const kagemusha = this.state.kagemusha;
    var firstKagemusha = kagemusha.first;
    var secondKagemusha = kagemusha.second;
    if (player === Player.first) {firstKagemusha = i}
    else {secondKagemusha = i}
    this.setState({
      kagemusha: {first: firstKagemusha, second: secondKagemusha},
      turn: this.state.turn === Player.first ? Player.second : Player.first,
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
            onKomaMove={(beforeIndex, afterIndex, promote) => this.handleKomaMove(beforeIndex, afterIndex, promote, Player.first)}
            player={Player.first}
            turn={this.state.turn}
            kagemusha={this.state.kagemusha.first}
            onKagemushaSelected={(i) => this.handleKagemushaSelected(Player.first, i)}
            winner={this.state.winner}
          />
          <br />
          <Board
            squares={currentSquare}
            onKomaMove={(beforeIndex, afterIndex, promote) => this.handleKomaMove(beforeIndex, afterIndex, promote, Player.second)}
            player={Player.second}
            turn={this.state.turn}
            kagemusha={this.state.kagemusha.second}
            onKagemushaSelected={(i) => this.handleKagemushaSelected(Player.second, i)}
            winner={this.state.winner}
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
  if (isPromoteIndex(player, afterIndex)) return true;
  if (isPromoteIndex(player, beforeIndex)) return true;
  return false;
}

function isPromoteIndex(player, index) {
  const dan = indexToSujiDan(index)[1];
  if (player === Player.first && (1 <= dan && dan <= 3)) return true;
  if (player === Player.second && (7 <= dan && dan <= 9)) return true;
  return false; 
}

function getUpdatedKagemusha(player, kagemusha, currentSquare, beforeIndex, afterIndex) {
  if (currentSquare[beforeIndex].owner !== player) { return kagemusha; }
  
  var firstKagemusha = kagemusha.first;
  var secondKagemusha = kagemusha.second;
  if (player === Player.first && beforeIndex === firstKagemusha) {
    firstKagemusha = afterIndex;
  }
  else if (player === Player.second && beforeIndex === secondKagemusha){
    secondKagemusha = afterIndex;
  }
  return {first: firstKagemusha, second: secondKagemusha};
}

function getWinnerIfExist(player, kagemusha, afterIndex) {
  const otherKagemusha = getKagemushaByPlayer(Player.getOther(player), kagemusha);
  if (otherKagemusha === afterIndex) {
    return player;
  }
  return null;
}

function getKagemushaByPlayer(player, kagemusha) {
  if (player === Player.first) return kagemusha.first;
  else return kagemusha.second;
}

function getIndex(player, i) {
  if (player === Player.first) { return i;}
  else { return  80 - i;}
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  