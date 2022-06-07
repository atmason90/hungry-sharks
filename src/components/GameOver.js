import React from 'react';
import Link from 'react-router-dom';



const GameOver = ({ winner }) => {
  return (
    <div>
      <h1>Game Over!</h1>
      {/* line for which player won */}
      <h2>{winner} wins!</h2>
      {/* button asking if want to rematch */}
      <Link to="/game">
        <button>Rematch?</button>
      </Link>
      {/* button to return to home page */}
      <Link to='/home'>
        <button>Home</button>
      </Link>
      {/* button to view highscores page */}
      <Link to='/highscores'>
        <button>View Stats</button>
      </Link>
    </div>
  )
}

export default GameOver
