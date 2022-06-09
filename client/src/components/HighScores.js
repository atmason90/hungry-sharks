import React from 'react';


const HighScores = () => {

    let highscores;

    
    async function getHighscores() {
        const response = await fetch('/api/highscores', {
            method: "GET",
        });
        highscores = await response.json();
        console.log(highscores);
    }
    getHighscores();

  return (
    <div>
      
    </div>
  )
}

export default HighScores


// import React, { useState, useEffect } from 'react';
// import Auth from '../utils/auth';
// import { getHighscores, getSingleHighscore } from '../utils/API';
// // import userController from '../../../server/controllers/user-controller';

// const HighScores = () => {
//   // const [getHighscores, setHighscores] = useState([]);

//   const [getSingleHighscore, setSingleHighscores] = useState([]);

//   // useEffect(() => {
//   //   return () => 
//   // })


//   // // const userData = items.map((user) => ({
//   //   games: user.games,
//   //   wins: user.wins,
//   //   losses: user.losses
//   // }));

//   // setSingleHighscores(userData);

//   return (
//     <div>
//       {/* figure out how to display data from mongodb */}
//       <h2>
//         {/* Games Played: {user.games} */}
//       </h2>
      
//     </div>
//   )
// }


// export default HighScores
