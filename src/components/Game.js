import {useState} from 'react';

const Game = () => {
  
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("");
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);
  const [p1remainingTurns, setP1RemainingTurns] = useState(0);
  const [p2remainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("P1");

  
return (
    <div>
        Game
    </div>
  )
}

export default Game