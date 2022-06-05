import {useState, useEffect} from 'react';
import shuffler from '../utils/shuffler';

const Game = () => {
  
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("");
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);
  const [p1RemainingTurns, setP1RemainingTurns] = useState(1);
  const [p2RemainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("P1");
  const [threeCards, setThreeCards] = useState([]);

  // HS = Hungry Shark (Exploding kitten)
  // SG = Sacrificial goat (Defuser)
  // AS = Assert Yourself (Attack)
  // ST = Steal (Favor)
  // SH = Shuffle  
  // SN = Snooze (Skip)
  // DR = Divine Revelation (See the future)
  // WC = White Crayon (Tacocat)
  const cards = ["SG", "SG", "SG", "SG", "AS", "AS", "AS", "AS", "ST", "ST", "ST", "ST", "SH", "SH", "SH", "SH", "SN", "SN", "SN", "SN", "DR", "DR", "DR", "DR", "DR", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC"];

  // Setup game by distributing cards
  useEffect(() => {
    
    //Shuffle cards using our shuffler function
    const shuffledCards = shuffler(cards);
    
    //Distribute 7 cards to each player and 1 Defuse card each
    const cardsForP1 = shuffledCards.splice(0,7);
    cardsForP1.push("SG");
    
    
    const cardsForP2 = shuffledCards.splice(0,7);
    cardsForP2.push("SG");
    
    // Add remaining cards to the drawCardPile and insert shark and reshuffle; 
    const remainingCards = shuffledCards;
    remainingCards.push("HS");
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

  },[]);

  function cardPlayedHandler(cardPlayed) {
    const cardPlayedBy = activePlayer;
    let playerRemainingTurns;
    cardPlayedBy === "P1" ? playerRemainingTurns = p1RemainingTurns : playerRemainingTurns = p2RemainingTurns;

    switch(playedCard) {
     
      //---------------Logic for shuffle card---------------------//

      //Make array that has all cards in draw pile
      //Use shuffler function to shuffle that array
      //Set state to be that shuffled array
      case "SH" : {
        let drawDeck = [...drawCardsPile];
        drawDeck = shuffler(drawDeck);
        setDrawCardsPile([...drawDeck]);
        break;
      }

      //-----------------Logic for Snooze card----------------------------//

      // Decrease current player's remaining turns by 1
      //Check if he has no turns left. In that case end this player's turn and add 1 turn to other player
      //If player still has a turn left, just decrement state of remaining turns for that player
      case "SN" : {
        playerRemainingTurns = playerRemainingTurns - 1;
         if(playerRemainingTurns === 0) {
           if(cardPlayedBy === "P1") {
             setP2RemainingTurns(p2RemainingTurns + 1);
             setP1RemainingTurns(playerRemainingTurns);
             setActivePlayer("P2");
           }
           else if(cardPlayedBy === "P2") {
             setP1RemainingTurns(p1RemainingTurns + 1);
             setP2RemainingTurns(playerRemainingTurns);
             setActivePlayer("P1");
           }
         }
         else if(playerRemainingTurns !== 0) {
           if(cardPlayedBy === "P1") {
             setP1RemainingTurns(playerRemainingTurns);
           }
           else if(cardPlayedBy === "P2") {
             setP2RemainingTurns(playerRemainingTurns);
           }
         }
         break;
      }

      //-----------------------Logic for Steal card---------------------------//

      //Grab a hold of current player's cards and opponent's cards
      //Randomly remove 1 card from opponent's cards and add it to current player's cards
      //Update states for both player's cards
      case "ST" : {
        let opponentsDeck;
        let currentPlayersDeck;
        cardPlayedBy === "P1" ? opponentsDeck = [...p2Cards] : opponentsDeck = [...p1Cards];
        cardPlayedBy === "P1" ? currentPlayersDeck = [...p1Cards] : currentPlayersDeck = [...p2Cards];
        
        let indexOfCardToRemove = Math.floor(Math.random() * opponentsDeck.length);
        let cardToAdd = opponentsDeck.splice(indexOfCardToRemove, 1); 
        currentPlayersDeck.push(cardToAdd[0]);

        if(cardPlayedBy === "P1") {
          setP1Cards([...currentPlayersDeck]);
          setP2Cards([...opponentsDeck]);
        }
        else if(cardPlayedBy === "P2") {
          setP2Cards([...currentPlayersDeck]);
          setP1Cards([...opponentsDeck]);
        }
        break;
      }

      //-----------------------Logic for Divine Revelation card-------------------------//

      //Make new empty array and populate it with the top 3 cards in our deck
      //set state of threecads to that new array
      //Display these cards to active player....??????
      case "DR" : {
        const topThreeCards = [];
        for(let i = (drawCardsPile.length-1); i>(drawCardsPile.length - 4); i--) {
          topThreeCards.push(drawCardsPile[i]);
        }
        setThreeCards([...topThreeCards]);
        //Display these three cards somehow to active player
        break;
      }

      //----------------------------Logic for Assert card---------------------------//

      //Check if player has 1 or 2 remaining turns when he played the card
      //If he had 1, end this player's turn and assign 2 turns to oppenent
      //If he had 2, end this player's turn and assign 1 turn to opponent
      case "AS" : {
        if(playerRemainingTurns === 2) {
          if(cardPlayedBy === "P1") {
            setP1RemainingTurns(playerRemainingTurns - 2);
            setP2RemainingTurns(1);
            setActivePlayer("P2");
          }
          else if(cardPlayedBy === "P2") {
            setP2RemainingTurns(playerRemainingTurns - 2);
            setP1RemainingTurns(1);
            setActivePlayer("P1");
          }
        }
        else if(playerRemainingTurns === 1) {
          if(cardPlayedBy === "P1") {
            setP1RemainingTurns(playerRemainingTurns - 1);
            setP2RemainingTurns(2);
            setActivePlayer("P2");
          }
          else if(cardPlayedBy === "P2") {
            setP2RemainingTurns(playerRemainingTurns - 1);
            setP1RemainingTurns(2);
            setActivePlayer("P1");
          }
        }
      }

      default : {console.log("Error");};
    }

  }
  
return (
    <div>
        Game
    </div>
  )
}

export default Game