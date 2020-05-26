import React, { Component } from 'react';
import "bootswatch/dist/darkly/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // not sure if this does much
import Button from "react-bootstrap/Button"
import CardList from "./CardList"
import './App.css';
// import Card from "react-bootstrap/Card"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHand: [],
      opponentHand: [],
      activePlayerCards: [],
      activeOppCards: [],
      wonStatus: null,
      gameRunning: false,
      winner: null
    }
  }

  playRound = () => {
    if (this.state.playerHand[0] != null) {
      let player = this.state.playerHand
      let opp = this.state.opponentHand

      let index = 0;
      while (player[index].value === opp[index].value) {
        index += 4;
        console.log(index)
        if (player.length <= index) { // if a player can't draw 4 for war, they instantly lose
          this.setState({ gameRunning: false, winner: "opponent" })
          break;
        }
        if (opp.length <= index) {
          this.setState({ gameRunning: false, winner: "player" })
          break;
        }
      }

      if (this.state.gameRunning) { // does state even update fast enough for this to work?
        let playerWonRound = player[index].value > opp[index].value;
        let playerDiscard = player.splice(0, index + 1);
        let oppDiscard = opp.splice(0, index + 1);

        this.setState({
          activePlayerCards: playerDiscard,
          activeOppCards: oppDiscard
        })

        if (playerWonRound) {
          player = player.concat(playerDiscard, oppDiscard)
          this.setState({ wonStatus: "You won the round!" })
        }
        else {
          opp = opp.concat(playerDiscard, oppDiscard)
          this.setState({ wonStatus: "You lost the round!" })
        }

        this.setState({
          playerHand: player,
          opponentHand: opp
        })
      }
    }
    else {
      console.log("Can't play a round with no cards")
    }
  }

  playGame = () => { // this breaks state for some reason? i suspect it's because the state updates too slowly
    if (this.state.playerHand[0] != null) {
      let i=0;
      while (this.state.playerHand.length !== 0 && this.state.opponentHand !== 0) {
        this.playRound();

        if(this.state.playerHand.length + this.state.opponentHand.length !== 52){
          i++;
          console.log("On iteration " + i);          
          console.log(this.state.playerHand.length)
          console.log(this.state.opponentHand.length)          
          console.log(this.state.playerHand)
          console.log(this.state.opponentHand)
          
        }
      }
      console.log(this.state.playerHand.length === 0 ? "You lost!" : "You won!")
    }
    else {
      console.log("Can't play a game with no cards")
    }

  }
  dealHands = () => {
    let deck = [];
    let suits = ["hearts", "diamonds", "spades", "clubs"]
    for (let card = 0; card < 13; card++) { // 11-14 are J/Q/K/A respectively
      for (let i = 0; i < 4; i++) {
        deck.push({ suit: suits[i], value: parseInt(card) });
      }
    }

    let startingPlayerHand = [], startingOppHand = [];
    for (let i = 0; i < 52; i++) {
      let index = Math.floor(Math.random() * deck.length);
      if (i % 2 === 0) {
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
    console.log(startingOppHand);
    this.setState({
      playerHand: startingPlayerHand,
      opponentHand: startingOppHand,
      gameRunning: true
    })
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">War</h1>
        <div className="game">
          {/* <div id="game"> */}
          <CardList title="Your cards" cards={this.state.playerHand} activeCards={this.state.activePlayerCards} />
          <p>{this.state.wonStatus != null ? this.state.wonStatus : ""}</p>
          <CardList title="Opponent's cards" cards={this.state.opponentHand} activeCards={this.state.activeOppCards} />
          {/* </div> */}
        </div>
        <div id="buttons">
          {/* {!this.state.gameRunning ?
          <Button onClick={this.dealHands}>Start</Button> :
          <Button onClick={this.playRound}>Play round</Button>} */}

          <Button onClick={this.dealHands}>Start</Button> 
          <Button onClick={this.playRound}>Play round</Button>
          <Button onClick={this.playGame}>Play entire game</Button>
        </div>
      </div>
    );
  }
}

export default App;
