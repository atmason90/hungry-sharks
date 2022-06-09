import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Game from './components/Game';
import HighScores from './components/HighScores';
import Login from './components/Login'
import Rules from './components/Rules';
import Signup from './components/Signup';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
        <Route exact path="/" element={<Home/>}/>
          <Route exact path="/game" element={<Game/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/rules" element={<Rules/>}/>
          <Route exact path="/highscores" element={<HighScores/>}/>
        </Routes>
      
      </Router>

    </div>
  );
}

export default App;
