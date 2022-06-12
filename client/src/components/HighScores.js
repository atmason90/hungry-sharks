import Auth from "../utils/auth";
import { getHighscores, getMe, getSingleHighscore } from "../utils/API";
import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import Navbar from "./Navbar";

const HighScores = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserHighscores();
  })

  useEffect(() => {
    console.log("Highscore user data ", userData);
   
  }, [userData]);


  const getUserHighscores = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }
      const response = await getMe(token);
      console.log(response);
      if (!response.ok) {
        throw new Error("something is wrong");
      }
      const user = await response.json();
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="pt-24">
        <h2 className="text-4xl text-orange-600">
          {userData.stats
            ? `Viewing ${userData.username}'s Game Stats:`
            : "You have no stats!"}
        </h2>
        <Stats  wins={userData.stats.wins} losses={userData.stats.losses}/>
      </div>
    </div>
  );
};

export default HighScores;
