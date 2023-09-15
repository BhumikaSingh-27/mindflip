import React from 'react'
import "./Card.css"

const Card = ({card,handleCard,flippedCard,disabled}) => {

const flipCard = () =>{
  if(!disabled){
    handleCard(card)
  }        
}
  return (
    <div className="card">
    <div className={flippedCard ? "flipped" : ""}>
      <img className="front" src={card.src}  alt="front card" />
      <img 
      className="back" 
      onClick={flipCard}
      src="/img/cover.png"  
      alt=" back card" />
    </div>
  </div>
  )
}

export default Card