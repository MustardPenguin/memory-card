import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import lodash from "lodash";

const Board = (props) => {
    const [pickedCards, setPickedCards] = useState([]);
    const maxCards = 10;
    const elements = Array.from({ length: maxCards }, (_, i) => i);
    const [cards, setCards] = useState(elements);

    const scoreFunctions = props.scoreFunctions;

    const pickCard = (cardNumber) => {
        let copy = lodash.cloneDeep(pickedCards);
        copy.push(cardNumber);
        setPickedCards(copy);
    }

    const randomizeArray = () => {
        let array = lodash.cloneDeep(cards);
        let currentIndex = cards.length, randomIndex;
        while(currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        setCards(array);
    }

    useEffect(() => {
        console.log(pickedCards);
        let latestCard = pickedCards[pickedCards.length - 1];
        let dupe;
        for(let i = 0; i < pickedCards.length - 1; i++) {
            if(latestCard == null) { break; }
            let card = pickedCards[i];
            if(card === latestCard) {
                dupe = card;
                break;
            }
        }
        
        if(dupe) {
            scoreFunctions.resetScores();
            setPickedCards([]);
        } else {
            scoreFunctions.setScore(scoreFunctions.score + 1);
            console.log("Scored");
        }
        randomizeArray();
    }, [pickedCards]);

    return (
        <div className="board-holder">
            {cards.map( (x) => {
                return <div 
                    onClick={() => pickCard(x)} 
                    key={uniqid()} 
                    className="card">
                        {x}
                    </div>;
            })}
            
        </div>
    )
}

export default Board;