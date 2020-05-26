import React from "react";

import Card from "react-bootstrap/Card"

const cardValues = [2,3,4,5,6,7,8,9,10,"Jack","Queen","King","Ace"]
const CardList = ({title, cards, activeCards}) => {
    return <div>
        <h1>{title}</h1>
        {activeCards.map(card => {
            return <Card>{cardValues[card.value]} of {card.suit}</Card>
        })}
        <h2>Total cards: {cards.length}</h2>
    </div>
}

export default CardList;