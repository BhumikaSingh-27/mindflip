import { useEffect, useRef, useState } from "react";
import "./App.css";
import cardData from "./data/data";
import Card from "./components/card/Card";

function App() {
  const [index,setIndex] = useState(0)
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [flip, setFlip] = useState(false);
  const [turn,setTurn] = useState(0)
  const score = useRef(0);


  const suffleCards = (index) => {
    const shuffledData  = cardData.slice(0+index, 6+index)
    const shuffledCard = [...shuffledData, ...shuffledData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCard);
    score.current = 0;
    firstFlip();
    setTurn(0)
  };

  const handleCardChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        const updatedCards = cards.map((card) =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        );
        setCards(updatedCards);
        setTurn(turn =>turn+1)
        reset();
        score.current = score.current + 7;
      } else {
        setTurn(turn =>turn+1)
        setTimeout(() => {
          reset();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo, cards, score]);

  useEffect(() => {
    suffleCards(0)
    firstFlip();
  }, []);

  useEffect(()=>{

    setTimeout(()=>{
    if(score.current === 42){
      if(index === cardData.length){
        setIndex(0)
        suffleCards(0)
      } 
    setIndex(index => index+6) 
    suffleCards(6)
  }},1000)

  },[score.current,index])

  const firstFlip = () => {
    setFlip(true);
    setTimeout(() => setFlip(false), 2000);
  };
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);   
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Mind Flip</h1>
      <div className="flex-display">
        Points : {score.current}
        <button onClick={()=>suffleCards(index)}>New Game</button>
      </div>

      {score.current === 42 && <div className="notify">Start the new game!</div>}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleCard={handleCardChoice}
            flippedCard={
              card === choiceOne || card === choiceTwo || card.matched || flip
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Your turn : {turn}</p>
    </div>
  );
}

export default App;
