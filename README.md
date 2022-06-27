# Hungry Sharks

![License Badge](https://img.shields.io/badge/License-MIT-blue)  
Deployed Application: https://hungryshark.herokuapp.com/  
GitHub Repository: https://github.com/MoeCancode/hungry-sharks

## Usage Instructions
- Visit deployed application: https://hungryshark.herokuapp.com/  
- Signup to create a profile
- Review the rules page to learn how to play
- Find and opponent
- Click "Create Game" on the home page
- Share game code with your opponent so that they can join the game you created
- Play Hungry Sharks. Good Luck!
- To view your stats, visit the Highscores page

## Table of Contents

- [Description](#description)
- [Screenshot](#screenshot)
- [Code Examples](#code-examples)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)
- [Questions](#questions)
- [License](#license)

## Description

Hungry Sharks is a multiplayer card game that is built with a React frontend and a MongoDB backend. This full stack application has many interesting features including live multiplayer functionality, instant messaging between opponents, stored user game statistics, and a nicely designed UI.

## Screenshot

![2022-06-11 19 57 04](https://user-images.githubusercontent.com/99947655/173212352-40d96d5a-b440-46c2-8453-20a0e6e4e7ea.gif)

## Code Examples

Building the game logic for Hungry Sharks required keeping track of a high number of game states using state variables.

```js
const Game = () => {
  const locationURL = window.location.href;
  const split = locationURL.split("=");
  const codeForRoom = split[1];

  //Websocket
  const [room, setRoom] = useState(codeForRoom);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  //Modals, info and toggle
  const [modalP1Show, setModalP1Show] = useState(false);
  const [modalP2Show, setModalP2Show] = useState(false);
  const [info, setInfo] = useState("The shark is now officially hungry!");
  //Message state
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isChatBoxHidden, setChatBoxHidden] = useState(true)
  //Game state
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("back");
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);
  const [p1RemainingTurns, setP1RemainingTurns] = useState(0);
  const [p2RemainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("");
  const [threeCards, setThreeCards] = useState([]);
```

Each gameplay card had a complex set of logic that aligned with the game's rules.

```js
 case "DR": {
        const topThreeCards = [];
        for (
          let i = drawCardsPile.length - 1;
          i > drawCardsPile.length - 4;
          i--
        ) {
          topThreeCards.push(drawCardsPile[i]);
        }
        if (activePlayer === "P1") {
          socket.emit("updateGameState", {
            playedCard: cardPlayed,
            threeCards: [...topThreeCards],
            p1RemainingTurns: p1RemainingTurns,
            p2RemainingTurns: p2RemainingTurns,
            p1Cards: [...cardsOfP1],
            p2Cards: [...cardsOfP2],
            modalP1Show: true,
            info: `The Gods have intervened! ${activePlayer} knows the next 3 cards in the deck`,
          });
        } else if (activePlayer === "P2") {
          socket.emit("updateGameState", {
            playedCard: cardPlayed,
            threeCards: [...topThreeCards],
            p1RemainingTurns: p1RemainingTurns,
            p2RemainingTurns: p2RemainingTurns,
            p1Cards: [...cardsOfP1],
            p2Cards: [...cardsOfP2],
            modalP2Show: true,
            info: `The Gods have intervened! ${activePlayer} knows the next 3 cards in the deck`,
          });
        }
```

One interesting feature that was used in this application was the Apexcharts library, which allows for building highly customizable data visualizations and rendering them inside React components.

```js
<Chart
                        options={{
                            chart: {
                                type: 'donut',
                            },
                            labels: ['Wins', 'Losses'],
                            legend: {
                                show: true,
                                showForSingleSeries: true,
                                showForNullSeries: true,
                                showForZeroSeries: true,
                                fontSize: '16px',
                                fontWeight: '600',
                                labels: {
                                    useSeriesColors: true
                                }
                            },
                            colors: ['#c2410c', '#1d4ed8'],
                            tooltip: {
                                style: {
                                    fontSize: '16px'
                                }
                            },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '55%',
                                        labels: {
                                            show: true,
                                            value: {
                                                show: true,
                                                fontSize: '22px',
                                                fontFamily: 'Helvetica, Arial, sans-serif',
                                                fontWeight: '600',
                                                color: 'white',
                                            },
                                            total: {
                                                show: true,
                                                showAlways: true,
                                                label: 'Total Games',
                                                fontSize: '22px',
                                                fontFamily: 'Helvetica, Arial, sans-serif',
                                                fontWeight: '600',
                                                color: 'white',
                                                formatter: function(w) {
                                                    return w.globals.seriesTotals.reduce((a, b) => {
                                                        return a + b
                                                    }, 0)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                        series={[wins, losses]}
                        // series={[0, 0]}
                        type={'donut'}
                        width={'60%'}
```

## Technologies Used

- React
- JavaScript
- JSX
- Tailwind CSS
- Apexcharts
- MongoDB
- Mongoose ODM
- Express.js
- JavaScript Web Token (JWT)
- Bcrypt
- Websockets
- Socket.io
- Profanity Censor
- Cors
- Fetch

## Contributors

- [Mohammad A Razvi](https://github.com/MoeCancode)
- [Mateo Navarro](https://github.com/mateonav98)
- [Andrew Mason](https://github.com/atmason90)

## Questions

If there are any questions about this project, please reach out to any of the contributors via their GitHub profiles.

## License

MIT License

Copyright (c) 2022 Mohammad A Razvi, Mateo Navarro, Andrew Mason

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
