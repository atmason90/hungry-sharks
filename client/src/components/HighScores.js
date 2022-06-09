import Auth from '../utils/auth';
import {getHighscores, getMe, getSingleHighscore} from '../utils/API'
import React, { useState, useEffect } from 'react';



const HighScores = () => {

    const [userData, setUserData] = useState({})
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
      const getUserHighscores = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false
        }
        const response = await getMe(token);
        console.log(response)
        if (!response.ok) {
          throw new Error('something is wrong')
        }
        const user = await response.json();
        setUserData(user);
      }
      catch(error) {
      console.log(error);
    };
  }
  console.log(userData)
  
  getUserHighscores();
}, [userDataLength])

  return (
    <div>
          <h2>
          {userData.stats
            ? `Viewing ${userData.stats} saved ${userData.stats === 1 ? 'stat' : 'stats'}:`
            : 'You have no stats!'}
        </h2>
      
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
