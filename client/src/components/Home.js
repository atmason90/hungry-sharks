import { useState } from "react";
import { Link } from "react-router-dom";
import roomCodeGenerator from "../utils/roomCodeGenerator";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="Homepage flex flex-row items-center justify-center">
        <div>
            <button className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10">
                Create Game
            </button>
        </div>
        <div>
            <button className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded ml-10">
                Join Game
            </button>
        </div>
    </div>
  );
};

export default Home;


