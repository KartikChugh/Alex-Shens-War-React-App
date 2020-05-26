## War

Simple card game. Since I am not an expert, here's Wikipedia's explanation:

> The objective of the game is to win all of the cards.
> 
> The deck is divided evenly among the players, giving each a down stack. In unison, each player reveals the top card of their deck—this is a "battle"—and the player with the higher card takes both of the cards played and moves them to their stack. Aces are high, and suits are ignored.
>
> If the two cards played are of equal value, then there is a "war". Both players place the next card of their pile face down (some variants have three face down cards) and then another card face-up. The owner of the higher face-up card wins the war and adds all the cards on the table to the bottom of their deck. If the face-up cards are again equal then the battle repeats with another set of face-down/up cards. This repeats until one player's face-up card is higher than their opponent's.

This particular implementation of War will draw 3 face-down when a "war" is initiated, and will use the 4th card drawn to determine who wins. "Wars" are also automatically resolved, without the player having to click buttons to manually draw out the next 4 cards.

## Notes on development

I put in a button to autoresolve the entire game by repeatedly playing turns, but for some reason it just breaks. It should be equivalent to a user repeatedly clicking "play round," but it looks like cards are being progressively lost from the arrays used to keep track of player/opponent cards in the state. I'm pretty sure this has something to do with the way setState works in React (i.e. it's not updated by the time the next run of the loop), but I'm not sure how to fix it. 
