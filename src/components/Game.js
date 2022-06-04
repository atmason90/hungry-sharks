import {useState, useEffect} from 'react';
import shuffler from '../utils/shuffler';

const Game = () => {
  
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("");
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);
  const [p1remainingTurns, setP1RemainingTurns] = useState(1);
  const [p2remainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("P1");

  // BS = blasting shark
  // DF = defuser
  // AT = attack
  // FA = favor
  // SH = shuffle
  // SK = skip
  // STF = see the future
  // WC = white crayon
  const cards = ["DF", "DF", "DF", "DF", "AT", "AT", "AT", "AT", "FA", "FA", "FA", "FA", "SH", "SH", "SH", "SH", "SK", "SK", "SK", "SK", "STF", "STF", "STF", "STF", "STF", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC"];

  // Setup game by distributing cards
  useEffect(() => {
    
    //Shuffle cards using our shuffler function
    const shuffledCards = shuffler(cards);
    
    //Distribute 7 cards to each player and 1 Defuse card each
    const cardsForP1 = shuffledCards.splice(0,7);
    cardsForP1.push("DF");
    
    
    const cardsForP2 = shuffledCards.splice(0,7);
    cardsForP2.push("DF");
    
    // Add remaining cards to the drawCardPile and insert shark and reshuffle; 
    const remainingCards = shuffledCards;
    remainingCards.push("BS");
    console.log("interim: " + remainingCards);
    const shuffledShark = shuffler(remainingCards);
    
    // Set state 
    setGameOver(false);
    setDrawCardsPile([...shuffledShark]);
    setP1Cards([...cardsForP1]);
    setP2Cards([...cardsForP2]);

    console.log("P1 Cards: " + p1Cards);
    console.log("P2 Cards: " + p2Cards);
    console.log("Remaining: " + drawCardsPile);

  }, []);

  
  
return (
    <div>
        Game
    </div>
  )
}

export default Game