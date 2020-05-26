import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: [],
      opponentHand: []
    }
  }

  playRound = () => {
    if (this.state.playerHand[0] != null) {
      let player = this.state.playerHand
      let opp = this.state.opponentHand

      let index = 0;
      while (player[index] == opp[index]) {
        index++;
        console.log(index)
      }

      // let playerWon = player[index] > opp[index]

      let playerDiscard = player.splice(0, index + 1);
      let oppDiscard = opp.splice(0, index + 1);


      if (player[index] > opp[index]) // if player won
      {
        console.log("You won the round!")
        player = player.concat(playerDiscard, oppDiscard)
      }
      else {
        opp = opp.concat(playerDiscard, oppDiscard)
        console.log("You lost the round!")
      }

      this.setState({
        playerHand: player,
        opponentHand: opp
      })
    }
    else{
      console.log("Can't play a game with no cards")
    }
  }

  playGame = () => {
    while (this.state.playerHand.length != 0 || this.state.opponentHand != 0) {
      this.playRound();
    }
    console.log(this.state.playerHand.length == 0 ? "You lost!" : "You won!")

  }
  dealHands = () => {
    let deck = [];
    for (let card = 2; card <= 14; card++) { // 11-14 are J/Q/K/A respectively
      for (let i = 0; i < 4; i++) {
        deck.push(parseInt(card));
      }
    }

    let startingPlayerHand = [], startingOppHand = [];
    for (let i = 0; i < 52; i++) {
      let index = Math.floor(Math.random() * deck.length);
      if (i % 2 == 0) {
        startingPlayerHand.push(deck[index]);
      }
      else {
        startingOppHand.push(deck[index]);
      }
      // console.log(index);
      // console.log(Math.random)

      deck.splice(index, 1);
    }
    console.log(startingPlayerHand);
    console.log(deck);
    this.setState({
      playerHand: startingPlayerHand,
      opponentHand: startingOppHand
    })
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.dealHands}>Start</button>
        <button onClick={this.playRound}>Play round</button>
        <button onClick={this.playGame}>Play game</button>
      </div>
    );
  }
}

export default App;
