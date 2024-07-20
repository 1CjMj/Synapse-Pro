"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import SingleCard from "@/components/SingleCard";
import { match } from "assert";

//array of cards... its outside the main component so that they wont be recreated everytime the main component is re-evaluated
const cardImages = [
  { 'src': "/card1.jpg", matched: false},
  { 'src': "/card2.jpg", matched: false},
  { 'src': "/card3.jpg", matched: false},
  { 'src': "/card4.jpg", matched: false},
  { 'src': "/card5.jpg", matched: false},
  { 'src': "/card6.jpg", matched: false}
]

interface Card {
  id: number;
  src: string;
}

function Game() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //function for duplicating cards, shuffling em' and applying random id
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //duplicating & spreading
      .sort(() => Math.random() - 0.5) //shuffling randomly
      .map((card) => ({...card, id:Math.random() })) //giving the cards random IDs

      // @ts-ignore
      setCards(shuffledCards)// ts-ignore is used here to ignore a typescript error from using shuffledCards
      setTurns(0)//so that the turn counter is set to 0 everytime the game starts... this is important!
      setChoiceOne(null)//making sure the game does not start by showing matched cards
      setChoiceTwo(null)
  }

  console.log(cards, turns) //for testing, delete when production ready

  //function for handling a choice
  //@ts-ignore
  const handleChoice = (card) => {
    console.log(card)
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      setDisabled(true)

      //@ts-ignore
      if (choiceOne.src === choiceTwo.src) {
        console.log('the cards be matching for real.')
        //@ts-ignore
        setCards(prevCards => {
          return prevCards.map(card => {
            //@ts-ignore
            if (card.src === choiceOne.src) {
              //@ts-ignore
              return {...card, matched:true}
            }

            else {
              return card
            }
          })
        })
        resetTurn()
      }

      else {
        console.log('well, those two do not match ')
        setTimeout(() => resetTurn(), 1000)
      }
    } 

  }, [choiceOne, choiceTwo])

  console.log(cards)

  //resetting choices & incrementing turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return(
    <div className="overflow-auto w-full h-full m-0 absolute top-0 left-0 flex justify-center items-center bg-gradient-to-tl from-purple-700 to-orange-500 text-base text-white text-center">
      <div className="max-h-full bg-transparent max-w-4xl m-12">

        <h1 className="text-xl">Synapse-Pro</h1>

        <br/>

        <Button onClick={shuffleCards} className="bg-transparent border-2 p-[2px] rounded-lg cursor-pointer hover:bg-purple-300 hover:text-purple-950">
          Re-shuffle
        </Button>

        <br/>

        <div className='card-grid mt-10 grid grid-cols-3 md:grid-cols-4 gap-5'>
          {cards.map((card: {id:number; src:string}) => (
            
            //@ts-ignore
            <SingleCard 
              key={card.id} 
              card={card}
              //@ts-ignore
              handleChoice={handleChoice}
              //@ts-ignore
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              //@ts-ignore
              disabled={disabled}
            />

          ))}
        </div>

        <br/>

        <p>Turns : {turns}</p>

        <br/>
      </div>
      
    </div>
  );
}

export default Game;