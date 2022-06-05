import {useState, useEffect} from 'react';
import shuffler from '../utils/shuffler';

const Game = () => {
  
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("ABC");
  const [p1Cards, setP1Cards] = useState(["ABC", "DEF", "GHI"]);
  const [p2Cards, setP2Cards] = useState(["UVW", "XYZ"]);
  const [p1RemainingTurns, setP1RemainingTurns] = useState(1);
  const [p2RemainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("P1");
  const [threeCards, setThreeCards] = useState([]);

  // HS = Hungry Shark (Exploding kitten)
  // SG = Sacrificial goat (Defuser)
  // DT = Double Trouble (Attack)
  // CR = Communist Regime (Favor)
  // SH = Shuffle  
  // SN = Snooze (Skip)
  // DR = Divine Revelation (See the future)
  // WC = White Crayon (Tacocat)
  const cards = ["SG", "SG", "SG", "SG", "DT", "DT", "DT", "DT", "CR", "CR", "CR", "CR", "SH", "SH", "SH", "SH", "SN", "SN", "SN", "SN", "DR", "DR", "DR", "DR", "DR", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC", "WC"];

  // Setup game by distributing cards
   useEffect(() => {
    
    //Shuffle cards using our shuffler function
    const shuffledCards = shuffler(cards);
    
    //Distribute 7 cards to each player and 1 Sacrificial goat card each
    const cardsForP1 = shuffledCards.splice(0,7);
    cardsForP1.push("SG");
    
    
    const cardsForP2 = shuffledCards.splice(0,7);
    cardsForP2.push("SG");
    
    // Add remaining cards to the drawCardPile and insert shark and reshuffle; 
    const remainingCards = shuffledCards;
    remainingCards.push("HS");
    const shuffledShark = shuffler(remainingCards);
    
    // Set state 
    setDrawCardsPile([...shuffledShark]);
    setP1Cards([...cardsForP1]);
    setP2Cards([...cardsForP2]);
    setGameOver(false);

    console.log("P1 Cards: " + p1Cards);
    console.log("P2 Cards: " + p2Cards);
    console.log("Remain: " + drawCardsPile);

  },[gameOver]);

  //Logic for action card's that player's play
  function cardPlayedHandler(cardPlayed) {
    const cardPlayedBy = activePlayer;
    let playerRemainingTurns;
    cardPlayedBy === "P1" ? playerRemainingTurns = p1RemainingTurns : playerRemainingTurns = p2RemainingTurns;

    switch(cardPlayed) {
     
      //---------------Logic for shuffle card---------------------//

      //Make array that has all cards in draw pile
      //Use shuffler function to shuffle that array
      //Set state to be that shuffled array
      case "SH" : {
        setPlayedCard("SH");

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
        setPlayedCard("SN");

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

      //-----------------------Logic for Communist Regime card---------------------------//

      //Grab a hold of current player's cards and opponent's cards
      //Randomly remove 1 card from opponent's cards and add it to current player's cards
      //Update states for both player's cards
      case "CR" : {
        setPlayedCard("CR");

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
        setPlayedCard("DR");

        const topThreeCards = [];
        for(let i = (drawCardsPile.length-1); i>(drawCardsPile.length - 4); i--) {
          topThreeCards.push(drawCardsPile[i]);
        }
        setThreeCards([...topThreeCards]);
        //Display these three cards somehow to active player
        break;
      }

      //----------------------------Logic for Double Trouble card---------------------------//

      //Check if player has 1 or 2 remaining turns when he played the card
      //If he had 1, end this player's turn and assign 2 turns to oppenent
      //If he had 2, end this player's turn and assign 1 turn to opponent
      case "DT" : {
        setPlayedCard("DT");

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
        break;
      }

      default : {console.log("Yes sir");};
    }

  }

  //Logic for when a player draws a card
  function drawCardHandler () {
    //Remove top card from card deck and check if it is hungry shark
    //If it is not, add the card to current player's deck, decrease player's remaining turns by 1
    //If the decrease in remaining turns caused them to be 0, add 1 remaining turn to opponent and set them as active

    //If the card drawn is a Hungry shark, check player's hand to see if they have a sacrificial goat.
    //If they do, remove goat from their hand and randomly insert HS back in the deck.
    //Decrease their turns by 1
    //If they dont have a goat, set game over to true, declare other player the winner, set played card to HS

    const cardPlayedBy = activePlayer;
    let playerRemainingTurns;
    cardPlayedBy === "P1" ? playerRemainingTurns = p1RemainingTurns : playerRemainingTurns = p2RemainingTurns;

    let cardDeck = [...drawCardsPile];
    const cardDrawn = cardDeck.pop();
    if(cardPlayedBy === "P1") {
      if(cardDrawn === "HS") {
        //Hungry shark handler
        const p1Hand = [...p1Cards];
        const goatCardIndex = p1Hand.indexOf("SG");
        if(goatCardIndex !== -1) {
          p1Hand.splice(goatCardIndex, 1);
          setP1Cards([...p1Hand]);

          const randomIndex = Math.floor(Math.random() * cardDeck.length);
          cardDeck.splice(randomIndex, 0, "HS");
          setDrawCardsPile([...cardDeck]);
          setPlayedCard("SG");
          setP1RemainingTurns(playerRemainingTurns - 1);
        }
        else {
          setPlayedCard("HS");
          setGameOver(true);
          setWinner("P2");
        }
      }
      else {
        setP1Cards([...p1Cards, cardDrawn]);
        setP1RemainingTurns(playerRemainingTurns - 1);
        if(playerRemainingTurns === 0) {
          setP2RemainingTurns(p2RemainingTurns + 1);
          setActivePlayer("P2");
        }
      }
    } 
    else if(cardPlayedBy === "P2") {
      if(cardDrawn === "HS") {
        //Hungry shark handler
        const p2Hand = [...p2Cards];
        const goatCardIndex = p2Hand.indexOf("SG");
        if(goatCardIndex !== -1) {
          p2Hand.splice(goatCardIndex, 1);
          setP2Cards([...p2Hand]);

          const randomIndex = Math.floor(Math.random() * cardDeck.length);
          cardDeck.splice(randomIndex, 0, "HS");
          setDrawCardsPile([...cardDeck]);
          setPlayedCard("SG");
          setP2RemainingTurns(playerRemainingTurns - 1);
        }
        else{
          setPlayedCard("HS");
          setGameOver(true);
          setWinner("P1");
        }
      }
      else {
        setP2Cards([...p2Cards, cardDrawn]);
        setP2RemainingTurns(playerRemainingTurns - 1);
        if(playerRemainingTurns === 0) {
          setP1RemainingTurns(p1RemainingTurns + 1);
          setActivePlayer("P1");
        }
      }
    }
  }
  
  
return (
  <div className={`Game`}>
  <>

      <div className='topInfo'>
          
          <h1>Game Code:</h1>
          
      </div>

     

      <>

          {gameOver ? <div>{winner !== '' && <><h1>GAME OVER</h1><h2>{winner} wins!</h2></>}</div> :
          <div>
              {/* P1 VIEW */}
              {activePlayer === 'P1' && <>    
              <div className='player2Deck' style={{pointerEvents: 'none'}}>
                  <p className='playerDeckText'>P2</p>
                  {p2Cards.map((item, i) => (
                      <img
                          key={i}
                          className='Card'
                          onClick={() => cardPlayedHandler(item)}
                          src={"../assets/HS.png"}
                          />
                  ))}
                  {activePlayer==='P2'}
              </div>
              <br />
              <div className='middleInfo' style={activePlayer === 'P2' ? {pointerEvents: 'none'} : null}>
                  <button className='game-button' disabled={activePlayer !== 'P1'} onClick={drawCardHandler}>DRAW CARD</button>
                  {playedCard &&
                  <img
                      className='Card'
                      src={require(`../assets/HS.png`).default}
                      /> }
                  
              </div>
              <br />
              <div className='player1Deck' style={activePlayer === 'P1' ? null : {pointerEvents: 'none'}}>
                  <p className='playerDeckText'>P1</p>
                  {p1Cards.map((item, i) => (
                      <img
                          key={i}
                          className='Card'
                          onClick={() => cardPlayedHandler(item)}
                          src={require(`../assets/HS.png`).default}
                          />
                  ))}
              </div>

               </> }

              {/* P2 VIEW */}
              {activePlayer === 'P2' && <>
              <div className='player1Deck' style={{pointerEvents: 'none'}}>
                  <p className='playerDeckText'>P1</p>
                  {p1Cards.map((item, i) => (
                      <img
                          key={i}
                          className='Card'
                          onClick={() => cardPlayedHandler(item)}
                          src={require(`../assets/HS.jpeg`).default}
                          />
                  ))}
                  {activePlayer==='P1'}
              </div>
              <br />
              <div className='middleInfo' style={activePlayer === 'P1' ? {pointerEvents: 'none'} : null}>
                  <button className='game-button' disabled={activePlayer !== 'P2'} onClick={drawCardHandler}>DRAW CARD</button>
                  {playedCard &&
                  <img
                      className='Card'
                      src={require(`../assets/HS.png`).default}
                      /> }
                 
              </div>
              <br />
              <div className='player2Deck' style={activePlayer === 'P1' ? {pointerEvents: 'none'} : null}>
                  <p className='playerDeckText'>P2</p>
                  {p2Cards.map((item, i) => (
                      <img
                          key={i}
                          className='Card'
                          onClick={() => cardPlayedHandler(item)}
                          src={require(`../assets/HS.png`).default}
                          />
                  ))}
              </div>

               </> }
          </div> }
      </> 
  </>

  <br />
  <a href='/'><button className="game-button red">QUIT</button></a>
</div>

  )
}

export default Game