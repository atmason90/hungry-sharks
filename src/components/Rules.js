import React from 'react'
import CR from '../assets/CR.png';
import DR from '../assets/DR.png';
import DT from '../assets/DT.png';
import HS from '../assets/HS.png';
import SG from '../assets/SG.png';
import SH from '../assets/SH.png';
import SN from '../assets/SN.png';
import WC from '../assets/WC.png';
import ImageGrid from './ImageGrid';

const itemData = [
    {
        img: `${CR}`,
        title: 'Communist Regime',
        describe: 'Get one Random Card from the opposing player'
    },
    {
        img: `${DR}`,
        title: 'Divine Revelation',
        describe: 'Take a peek at the top three cards from the draw pile. Plan your moves accordingly'
    },
    {
        img: `${DT}`,
        title: 'Double Trouble',
        describe: 'Play this card to end your turn without having to draw a card. The opposing player will then have to take two turns on the next round'
    },
    {
        img: `${HS}`,
        title: 'Hungry Shark',
        describe: 'Draw this card and it is Game Over! You Lose! (Unless you have a Sacrificial Goat, of course)'
    },
    {
        img: `${SG}`,
        title: 'Sacrificial Goat',
        describe: 'Play this card when you draw a Hungry Shark to avoid being eaten'
    },
    {
        img: `${SH}`,
        title: 'Shuffle',
        describe: 'Play this card to shuffle the deck if you have intel of a Hungry Shark coming up'
    },
    {
        img: `${SN}`,
        title: 'Snooze',
        describe: 'Skip your turn to potentially avoid drawing a Hungry Shark'
    },
    {
        img: `${WC}`,
        title: 'White Crayon',
        describe: 'You can not play this card because it is just as useless as a white crayon. But hey, at least it is not a Hungry Shark!'
    }
];


const Rules = () => {
  return (
    <div style={{backgroundColor: 'black'}}>
      <h1 style={{color: 'white'}}>Rules of the Game</h1>
      <div style={{color: 'white'}}>
      <h2>The Basics</h2>
        <ul style={{listStyleType: 'none'}}>
            <li>In the deck of cards are some Hungry Sharks. You play the game by putting the deck face down and taking turns drawing cards until someone draws a Hungry Shark</li>
            <hr></hr>
            <li>When that happens, that person is eaten by the Hungry Shark, and the other player wins the game.</li>
        </ul>
      </div>
      <div>
        <h2 style={{color: 'white'}}>The Cards</h2>
        <ul style={{color: 'white', listStyleType: 'none'}}>
            <li>Communist Regime - Get one Random Card from the opposing player</li>
            <li>Divine Revelation - Take a peek at the top three cards from the draw pile. Plan your moves accordingly</li>
            <li>Double Trouble - Play this card to end your turn without having to draw a card. The opposing player will then have to take two turns on the next round</li>
            <li>Hungry Shark - Draw this card and it is Game Over! You Lose! (Unless you have a Sacrificial Goat, of course)</li>
            <li>Sacrificial Goat - Play this card when you draw a Hungry Shark to avoid being eaten</li>
            <li>Shuffle - Play this card to shuffle the deck if you have intel of a Hungry Shark coming up</li>
            <li>Snooze - Skip your turn to potentially avoid drawing a Hungry Shark</li>
            <li>White Crayon - You can not play this card because it is just as useless as a white crayon. But hey, at least it is not a Hungry Shark!</li>
        </ul>
        <ImageGrid itemData={itemData}/>
      </div>  
    </div>
  )
}

export default Rules
