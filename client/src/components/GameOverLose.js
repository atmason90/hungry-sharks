import Auth from "../utils/auth";
import { getMe } from "../utils/API";
import React, { useState, useEffect } from "react";

const GameOverLose = ({ winner }) => {
  const [userData, setUserData] = useState({
    stats: {
      games: 0,
      wins: 0,
      losses: 0,
    },
  });

  useEffect(() => {

    getUserHighscores();

    const gamesWon = userData.stats.wins;
    const gamesLost = userData.stats.losses + 1;
    const gamesPlayed = userData.stats.games + 1;
    const usersID = userData.id;
    const body = { usersID, gamesWon, gamesLost, gamesPlayed };

    fetch("/api/users/me", { method: "PUT", body });
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
  console.log(userData);

  return (
    <div className="gol h-screen flex flex-col items-center">
      <h1
        className="text-xl mt-20 text-gray-200"
        style={{ letterSpacing: "10px" }}
      >
        WHERE YOUR GOATS AT?
      </h1>
      <h1 className="text-8xl text-orange-600">YOU LOST!</h1>
      <div className=" flex flex-row justify-center items-center my-5">
        <a href="/">
          <button className="btn btn-wide sm:btn-sm md:btn-md lg:btn-md hover:bg-orange-700 border-orange-700 bg-red-700 bg-opacity-40 hover:text-white">
            QUIT
          </button>
        </a>
      </div>
    </div>
  );
};

export default GameOverLose;
