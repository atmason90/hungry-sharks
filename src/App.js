import './App.css';
import Game from './components/Game';
import Login from './components/Login'
import Rules from './components/Rules';

function App() {
  return (
    <div className="App">
      
      <Game/> 
      <Login />
      <Rules />
    </div>
  );
}

export default App;
