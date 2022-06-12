import Auth from "../utils/auth";
import { getMe } from "../utils/API";
import React, { useState, useEffect } from "react";

const GameOverWon = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    updateUserWin();
  }, []);

  const updateUserWin = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }
      const response = await getMe(token);
      if (!response.ok) {
        throw new Error("something is wrong");
      }
      const user = await response.json();
      console.log('Prev Losses: ', user.stats.losses);
      user.stats.wins += 1;
      user.stats.games += 1;
      console.log('New Losses: ', user.stats.losses);
      const body = { 
        usersID: user.id,
        gamesWon: user.stats.wins,
        gamesLost: user.stats.losses,
        gamesPlayed: user.stats.games
      };
      console.log("Body is: ", body);
      const options = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body) 
      }
      const newUserRequest = await fetch("/api/users/me", options);
      const newUserData = await newUserRequest.json();
      console.log('newUserData:', newUserData);
      setUserData(newUserData);
    } catch (error) {
      console.log(error);
    }
    console.log("The user data is: ", userData);
  };


  return (
    <div className="gow h-screen flex flex-col items-center">
      <h1
        className="text-xl mt-20 text-gray-200"
        style={{ letterSpacing: "10px" }}
      >
        GOATS WERE SACRIFICED BUT IN THE END...
      </h1>
      <h1
        className="text-xl mt-20 text-gray-200"
        style={{ letterSpacing: "10px" }}
      >
        YOU MADE IT TO THE SHORE
      </h1>
      <h1 className="text-8xl text-orange-600">YOU WON!</h1>
      <div className=" flex flex-row justify-center items-center my-5">
        <a href="/">
          <button className="btn btn-wide sm:btn-sm md:btn-md lg:btn-md hover:bg-orange-700 border-orange-700 bg-red-700 bg-opacity-40 hover:text-white">
            QUIT
          </button>
        </a>
      </div>
    </div>
  )
}

export default GameOverWon
