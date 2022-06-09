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
