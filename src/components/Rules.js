import React from 'react'
import { ImageList } from '@material-ui/core';
import { ImageListItem } from '@material-ui/core';
import CR from '../assets/CR.jpeg';
import DR from '../assets/DR.jpeg';
import DT from '../assets/DT.jpeg';
import HS from '../assets/HS.jpeg';
import SG from '../assets/SG.jpeg';
import SH from '../assets/SH.jpeg';
import SN from '../assets/SN.jpeg';
import WC from '../assets/WC.jpeg';

const itemData = [
    {
        img: `${CR}`,
        title: 'Communist Regime',
    },
    {
        img: `${DR}`,
        title: 'Divine Revelation',
    },
    {
        img: `${DT}`,
        title: 'Double Trouble',
    },
    {
        img: `${HS}`,
        title: 'Hungry Shark',
    },
    {
        img: `${SG}`,
        title: 'Sacrificial Goat',
    },
    {
        img: `${SH}`,
        title: 'Shuffle',
    },
    {
        img: `${SN}`,
        title: 'Snooze',
    },
    {
        img: `${WC}`,
        title: 'White Crayon',
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
        <ImageList sx={{ width: 500, height: 800}} cols={3} rowHeight={400}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=300&fit=auto&auto=format`}
                        srcSet={`${item.img}?w=164&h=300&fit=auto&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading='lazy'
                    />
                </ImageListItem>
            ))}
        </ImageList>
      </div>  
    </div>
  )
}

export default Rules
