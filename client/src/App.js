import './App.css';
import Game from './components/Game';
import HighScores from './components/HighScores';
import Login from './components/Login'
import Rules from './components/Rules';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      
      <Game/> 
      <Login />
      <Rules />
      <Signup />
      <HighScores />
    </div>
  );
}

export default App;
