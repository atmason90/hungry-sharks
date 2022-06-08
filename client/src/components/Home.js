import { useState } from "react";
import { Link } from "react-router-dom";
import roomCodeGenerator from "../utils/roomCodeGenerator";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="Homepage flex flex-row items-center justify-center">
        <div>
            <Link to={`/play?roomCode=${roomCodeGenerator()}`}><button className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded mr-10">
                Create Game
            </button></Link>
        </div>
        <div className="flex flex-row">
        
        <Link to={`/play?roomCode=${roomCode}`}><button className="bg-[#000000] hover:bg-orange-700 text-white font-bold py-2 px-4 border border-[#f06c00] rounded ml-10">
                Join Game
            </button></Link>
            <input className="text-slate-1000 mx-1 w-20 bg-slate-800" type='text' placeholder='..Game Code' onChange={(event) => setRoomCode(event.target.value)} />
        </div>
    </div>
  );
};

export default Home;


