import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        PLAYER_ONE_SYMBOL: "X",
        PLAYER_TWO_SYMBOL: "O",
        currentTurn: "X",
        winnerTurn : "O",
        board: [
          "", "", "", "", "", "", "", "", ""
        ]
      }
    }


    handleClick(index) {
        if(this.state.board[index] === "" && !this.state.winner) {
          this.state.board[index] = this.state.currentTurn
          this.setState({
            board: this.state.board,
            currentTurn: this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL,
            winnerTurn: this.state.currentTurn === this.state.PLAYER_TWO_SYMBOL ? this.state.PLAYER_TWO_SYMBOL : this.state.PLAYER_ONE_SYMBOL,
            winner: this.checkForWinner(),
          })
        }
    }

checkForWinner() {
    var currentTurn = this.state.currentTurn
    var symbols = this.state.board
    var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return winningCombos.find(function(combo) {
      if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        return currentTurn
      }else{
        return false
      }
    })
}


  clearState() {
        window.location.reload()
     }

render() {
  return (
    <div className="app-container">
      {<h3>{`Welcome to Reactive Tic Tac Toe`}</h3>}
      {this.state.winner ? <h1>{`The winner is ${this.state.winnerTurn}`}</h1> : <h2>{` ${this.state.currentTurn} 's Turn`}</h2>}
      <div className="board">
      {this.state.board.map((cell, index) => {
        return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>;
      })}
      </div>
      <button onClick={() => this.clearState()}>New Round</button>
    </div>
  )
}
}

export default App;
