import Auth from '../utils/auth';
import { getMe } from '../utils/API'
import React, { useState, useEffect } from 'react';


const GameOverLose = ({ winner }) => {

  const [userData, setUserData] = useState({stats: {
    games:0,
    wins: 0,
    losses: 0
}})


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
}, [])

useEffect(() => {
const gamesWon = userData.stats.wins;
const gamesLost = userData.stats.losses +1;
const gamesPlayed = userData.stats.games +1;
const usersID = userData.id;
const body = {usersID, gamesWon, gamesLost, gamesPlayed}

fetch("/api/users/me", {method: "PUT", body}) 

}, [])




  return (
    <div>
      Oh no you Lose
    </div>
  )
}

export default GameOverLose
