import { useState, useEffect } from "react";
import shuffler from "../utils/shuffler";
import ModalP1 from "./ModalP1";
import ModalP2 from "./ModalP2";
import io from "socket.io-client";
import fullname from "../utils/fullname";
import Player1View from "./Player1View";
import Player2View from "./Player2View";
import Chatbox from "./Chatbox"
import profanity from "profanity-censor"
import GameOverWon from "./GameOverWon";
import GameOverLose from "./GameOverLose";


let socket;
const ENDPOINT = "http://localhost:3001";
// const ENDPOINT = "https://hungrysharkcardgame.herokuapp.com"

const Game = () => {
  const locationURL = window.location.href;
  const split = locationURL.split("=");
  const codeForRoom = split[1];

  //Websocket stufff
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
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [drawCardsPile, setDrawCardsPile] = useState([]);
  const [playedCard, setPlayedCard] = useState("back");
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);
  const [p1RemainingTurns, setP1RemainingTurns] = useState(0);
  const [p2RemainingTurns, setP2RemainingTurns] = useState(0);
  const [activePlayer, setActivePlayer] = useState("");
  const [threeCards, setThreeCards] = useState([]);

  // HS = Hungry Shark (Exploding kitten)
  // SG = Sacrificial goat (Defuser)
  // DT = Double Trouble (Attack)
  // CR = Communist Regime (Favor)
  // SH = Shuffle
  // SN = Snooze (Skip)
  // DR = Divine Revelation (See the future)
  // WC = White Crayon (Tacocat)
  const cards = [
    "SG",
    "SG",
    "DT",
    "DT",
    "DT",
    "DT",
    "CR",
    "CR",
    "CR",
    "CR",
    "CR",
    "CR",
    "SH",
    "SH",
    "SH",
    "SH",
    "SN",
    "SN",
    "SN",
    "SN",
    "DR",
    "DR",
    "DR",
    "DR",
    "DR",
    "DR",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
    "WC",
  ];

//Helper functions
const toggleChatBox = () => {
  const chatBody = document.querySelector('.chat-body')
  if(isChatBoxHidden) {
      chatBody.style.display = 'block'
      setChatBoxHidden(false)
  }
  else {
      chatBody.style.display = 'none'
      setChatBoxHidden(true)
  }
}
const sendMessage= (event) => {
  event.preventDefault()
  if(message) {
      socket.emit('sendMessage', { message: profanity.filter(message) }, () => {
          setMessage('')
      })
  }
}

  //Initialize socket connection
  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: room }, (error) => {
      if (error) setRoomFull(true);
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("disconnect");
      //shut down connection instance
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on(
      "initGameState",
      ({
        gameOver,
        activePlayer,
        p1Cards,
        p2Cards,
        drawCardsPile,
        p1RemainingTurns,
        p2RemainingTurns,
        noobModeP1,
        noobModeP2,
      }) => {
        setGameOver(gameOver);
        setActivePlayer(activePlayer);
        setP1Cards(p1Cards);
        setP2Cards(p2Cards);
        setDrawCardsPile(drawCardsPile);
        setP1RemainingTurns(p1RemainingTurns);
        setP2RemainingTurns(p2RemainingTurns);
      }
    );

    socket.on(
      "updateGameState",
      ({
        gameOver,
        winner,
        activePlayer,
        playedCard,
        p1Cards,
        p2Cards,
        drawCardsPile,
        p1RemainingTurns,
        p2RemainingTurns,
        threeCards,
        modalP1Show,
        modalP2Show,
        info,
      }) => {
        gameOver && setGameOver(gameOver);
        winner && setWinner(winner);
        activePlayer && setActivePlayer(activePlayer);
        playedCard && setPlayedCard(playedCard);
        p1Cards && setP1Cards(p1Cards);
        p2Cards && setP2Cards(p2Cards);
        drawCardsPile && setDrawCardsPile(drawCardsPile);
        p1RemainingTurns !== null && setP1RemainingTurns(p1RemainingTurns);
        p2RemainingTurns !== null && setP2RemainingTurns(p2RemainingTurns);
        threeCards && setThreeCards(threeCards);
        modalP1Show && setModalP1Show(modalP1Show);
        modalP2Show && setModalP2Show(modalP2Show);
        info && setInfo(info);
      }
    );

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("currentUserData", ({ name }) => {
      setCurrentUser(name);
      console.log(name);
    });

    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ])

      const chatBody = document.querySelector('.chat-body')
      chatBody.scrollTop = chatBody.scrollHeight
  });

  }, []);

  // Setup game by distributing cards
  useEffect(() => {
    //Shuffle cards using our shuffler function
    const shuffledCards = shuffler(cards);

    //Distribute 7 cards to each player and 1 Sacrificial goat card each
    const cardsForP1 = shuffledCards.splice(0, 7);
    cardsForP1.push("SG");

    const cardsForP2 = shuffledCards.splice(0, 7);
    cardsForP2.push("SG");

    // Add remaining cards to the drawCardPile and insert shark and reshuffle;
    const remainingCards = shuffledCards;
    remainingCards.push("HS");
    const shuffledShark = shuffler(remainingCards);

    // Emit initial state to websocket
    socket.emit("initGameState", {
      drawCardsPile: [...shuffledShark],
      p1Cards: [...cardsForP1],
      p2Cards: [...cardsForP2],
      gameOver: false,
      p1RemainingTurns: 1,
      p2RemainingTurns: 0,
      activePlayer: "P1",
    });
  }, []);

  //Logic for action cards that player's play
  function cardPlayedHandler(cardPlayed) {
    const cardPlayedBy = activePlayer;
    let playerRemainingTurns;
    cardPlayedBy === "P1"
      ? (playerRemainingTurns = p1RemainingTurns)
      : (playerRemainingTurns = p2RemainingTurns);

    const cardsOfP1 = [...p1Cards];
    const cardsOfP2 = [...p2Cards];

    if (cardPlayedBy === "P1") {
      const cardToRemove = cardsOfP1.indexOf(cardPlayed);
      cardsOfP1.splice(cardToRemove, 1);
      socket.emit("updateGameState", {
        p1Cards: [...cardsOfP1],
        p2Cards: [...cardsOfP2],
      });
    }
    if (cardPlayedBy === "P2") {
      const cardToRemove = cardsOfP2.indexOf(cardPlayed);
      cardsOfP2.splice(cardToRemove, 1);
      socket.emit("updateGameState", {
        p1Cards: [...cardsOfP1],
        p2Cards: [...cardsOfP2],
      });
    }

    switch (cardPlayed) {
      //---------------Logic for shuffle card---------------------//

      //Make array that has all cards in draw pile
      //Use shuffler function to shuffle that array
      //Set state to be that shuffled array
      case "SH": {
        let drawDeck = [...drawCardsPile];
        drawDeck = shuffler(drawDeck);
        // setDrawCardsPile([...drawDeck]);

        socket.emit("updateGameState", {
          drawCardsPile: [...drawDeck],
          playedCard: cardPlayed,
          p1RemainingTurns: p1RemainingTurns,
          p2RemainingTurns: p2RemainingTurns,
          info: "The deck has been Shuffled!",
        });

        break;
      }

      //-----------------Logic for Snooze card----------------------------//

      // Decrease current player's remaining turns by 1
      //Check if he has no turns left. In that case end this player's turn and add 1 turn to other player
      //If player still has a turn left, just decrement state of remaining turns for that player
      case "SN": {
        playerRemainingTurns = playerRemainingTurns - 1;
        if (playerRemainingTurns === 0) {
          if (cardPlayedBy === "P1") {
            // setP2RemainingTurns(p2RemainingTurns + 1);
            // setP1RemainingTurns(playerRemainingTurns);
            // setActivePlayer("P2");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p2RemainingTurns: p2RemainingTurns + 1,
              p1RemainingTurns: playerRemainingTurns,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P2",
              info: `${activePlayer} decided to sleep through their turn!`,
            });
          } else if (cardPlayedBy === "P2") {
            // setP1RemainingTurns(p1RemainingTurns + 1);
            // setP2RemainingTurns(playerRemainingTurns);
            // setActivePlayer("P1");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: p1RemainingTurns + 1,
              p2RemainingTurns: playerRemainingTurns,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P1",
              info: `${activePlayer} decided to sleep through their turn!`,
            });
          }
        } else if (playerRemainingTurns !== 0) {
          if (cardPlayedBy === "P1") {
            // setP1RemainingTurns(playerRemainingTurns);
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: playerRemainingTurns,
              p2RemainingTurns: p2RemainingTurns,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              info: `${activePlayer} decided to sleep through their turn!`,
            });
          } else if (cardPlayedBy === "P2") {
            // setP2RemainingTurns(playerRemainingTurns);
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p2RemainingTurns: playerRemainingTurns,
              p1RemainingTurns: p1RemainingTurns,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              info: `${activePlayer} decided to sleep through their turn!`,
            });
          }
        }
        break;
      }

      //-----------------------Logic for Communist Regime card---------------------------//

      //Grab a hold of current player's cards and opponent's cards
      //Randomly remove 1 card from opponent's cards and add it to current player's cards
      //Update states for both player's cards
      case "CR": {
        let opponentsDeck;
        let currentPlayersDeck;
        cardPlayedBy === "P1"
          ? (opponentsDeck = [...cardsOfP2])
          : (opponentsDeck = [...cardsOfP1]);
        cardPlayedBy === "P1"
          ? (currentPlayersDeck = [...cardsOfP1])
          : (currentPlayersDeck = [...cardsOfP2]);

        let indexOfCardToRemove = Math.floor(
          Math.random() * opponentsDeck.length
        );
        let cardToAdd = opponentsDeck.splice(indexOfCardToRemove, 1);
        currentPlayersDeck.push(cardToAdd[0]);

        if (cardPlayedBy === "P1") {
          const nameOfCard = fullname(cardToAdd[0]);
          const announce = `P1 has taken the ${nameOfCard} card from P2`;
          // setP1Cards([...currentPlayersDeck]);
          // setP2Cards([...opponentsDeck]);
          socket.emit("updateGameState", {
            playedCard: cardPlayed,
            p1Cards: [...currentPlayersDeck],
            p2Cards: [...opponentsDeck],
            p1RemainingTurns: p1RemainingTurns,
            p2RemainingTurns: p2RemainingTurns,
            info: announce,
          });
        } else if (cardPlayedBy === "P2") {
          const nameOfCard = fullname(cardToAdd[0]);
          const announce = `P2 has taken the ${nameOfCard} card from P1`;
          // setP2Cards([...currentPlayersDeck]);
          // setP1Cards([...opponentsDeck]);
          socket.emit("updateGameState", {
            playedCard: cardPlayed,
            p2Cards: [...currentPlayersDeck],
            p1Cards: [...opponentsDeck],
            p1RemainingTurns: p1RemainingTurns,
            p2RemainingTurns: p2RemainingTurns,
            info: announce,
          });
        }
        break;
      }

      //-----------------------Logic for Divine Revelation card-------------------------//

      //Make new empty array and populate it with the top 3 cards in our deck
      //set state of threecads to that new array
      //Display these cards to active player....??????
      case "DR": {
        const topThreeCards = [];
        for (
          let i = drawCardsPile.length - 1;
          i > drawCardsPile.length - 4;
          i--
        ) {
          topThreeCards.push(drawCardsPile[i]);
        }
        // setThreeCards([...topThreeCards]);
        // setModalP1Show(true);
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
        break;
      }

      //----------------------------Logic for Double Trouble card---------------------------//

      //Check if player has 1 or 2 remaining turns when he played the card
      //If he had 1, end this player's turn and assign 2 turns to oppenent
      //If he had 2, end this player's turn and assign 1 turn to opponent
      case "DT": {
        if (playerRemainingTurns === 2) {
          if (cardPlayedBy === "P1") {
            // setP1RemainingTurns(playerRemainingTurns - 2);
            // setP2RemainingTurns(1);
            // setActivePlayer("P2");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: 0,
              p2RemainingTurns: 1,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P2",
              info: `${activePlayer} is Doubling the Trouble`,
            });
          } else if (cardPlayedBy === "P2") {
            // setP2RemainingTurns(playerRemainingTurns - 2);
            // setP1RemainingTurns(1);
            // setActivePlayer("P1");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: 1,
              p2RemainingTurns: 0,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P1",
              info: `${activePlayer} is Doubling the Trouble`,
            });
          }
        } else if (playerRemainingTurns === 1) {
          if (cardPlayedBy === "P1") {
            // setP1RemainingTurns(playerRemainingTurns - 1);
            // setP2RemainingTurns(2);
            // setActivePlayer("P2");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: 0,
              p2RemainingTurns: 2,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P2",
              info: `${activePlayer} is Doubling the Trouble`,
            });
          } else if (cardPlayedBy === "P2") {
            // setP2RemainingTurns(playerRemainingTurns - 1);
            // setP1RemainingTurns(2);
            // setActivePlayer("P1");
            socket.emit("updateGameState", {
              playedCard: cardPlayed,
              p1RemainingTurns: 2,
              p2RemainingTurns: 0,
              p1Cards: [...cardsOfP1],
              p2Cards: [...cardsOfP2],
              activePlayer: "P1",
              info: `${activePlayer} is Doubling the Trouble`,
            });
          }
        }
        break;
      }

      default: {
        console.log("Yes sir");
      }
    }
  }

  //Logic for when a player draws a card
  function drawCardHandler() {
    //Remove top card from card deck and check if it is hungry shark
    //If it is not, add the card to current player's deck, decrease player's remaining turns by 1
    //If the decrease in remaining turns caused them to be 0, add 1 remaining turn to opponent and set them as active

    //If the card drawn is a Hungry shark, check player's hand to see if they have a sacrificial goat.
    //If they do, remove goat from their hand and randomly insert HS back in the deck.
    //Decrease their turns by 1
    //If they dont have a goat, set game over to true, declare other player the winner, set played card to HS

    // const cardPlayedBy = activePlayer;
    // let playerRemainingTurns;
    // cardPlayedBy === "P1" ? playerRemainingTurns = p1RemainingTurns : playerRemainingTurns = p2RemainingTurns;

    let cardDeck = [...drawCardsPile];
    let cardDrawn = cardDeck.pop();

    const p1Hand = [...p1Cards];
    const p2Hand = [...p2Cards];

    if (activePlayer === "P1") {
      const p1Turns = p1RemainingTurns - 1;

      if (cardDrawn === "HS") {
        //Hungry shark handler

        const goatCardIndex = p1Hand.indexOf("SG");
        if (goatCardIndex !== -1) {
          p1Hand.splice(goatCardIndex, 1);
          const randomIndex = Math.floor(Math.random() * cardDeck.length);
          cardDeck.splice(randomIndex, 0, "HS");

          // setP1Cards([...p1Hand]);
          // setDrawCardsPile([...cardDeck]);
          // setPlayedCard("SG");
          // setP1RemainingTurns(p1RemainingTurns - 1);

          // socket.emit("updateGameState", {
          //   p1Cards: [...p1Hand],
          //   p2Cards: [...p2Hand],
          //   drawCardsPile: [...cardDeck],
          //   playedCard: "SG",
          //   p1RemainingTurns: p1RemainingTurns - 1,
          //   p2RemainingTurns: p2RemainingTurns,
          // });

          if (p1Turns === 0) {
            // setP2RemainingTurns(p2RemainingTurns + 1);
            // setActivePlayer("P2");
            socket.emit("updateGameState", {
              p2RemainingTurns: 1,
              p1RemainingTurns: 0,
              p1Cards: [...p1Hand],
              p2Cards: [...p2Hand],
              playedCard: "SG",
              drawCardsPile: [...cardDeck],
              activePlayer: "P2",
              info: `${activePlayer} sacrificed a goat to the shark. The Shark has accepted their sacrifice!`,
            });
          } else if (p1Turns === 1) {
            socket.emit("updateGameState", {
              p2RemainingTurns: 0,
              p1RemainingTurns: 1,
              p1Cards: [...p1Hand],
              p2Cards: [...p2Hand],
              playedCard: "SG",
              drawCardsPile: [...cardDeck],
              info: `${activePlayer} sacrificed a goat to the shark. The Shark has accepted their sacrifice!`,
            });
          }
        } else {
          // setPlayedCard("HS");
          // setGameOver(true);
          // setWinner("P2");
          socket.emit("updateGameState", {
            playedCard: "HS",
            gameOver: true,
            winner: "P2",
          });
        }
      } else if (cardDrawn !== "HS") {
        // setP1Cards([...p1Cards, cardDrawn]);
        // setDrawCardsPile([...cardDeck]);
        // setP1RemainingTurns(rTurns);
        if (p1Turns === 1) {
          socket.emit("updateGameState", {
            p1Cards: [...p1Hand, cardDrawn],
            p2Cards: [...p2Hand],
            drawCardsPile: [...cardDeck],
            p1RemainingTurns: 1,
            p2RemainingTurns: 0,
            info: `${activePlayer} Drew a card and have 1 turn remaining`,
          });
        } else if (p1Turns === 0) {
          // setP2RemainingTurns(p2RemainingTurns + 1);
          // setActivePlayer("P2");
          //Yes
          console.log("This was done");
          socket.emit("updateGameState", {
            p1Cards: [...p1Cards, cardDrawn],
            p2Cards: [...p2Cards],
            drawCardsPile: [...cardDeck],
            p2RemainingTurns: 1,
            p1RemainingTurns: 0,
            activePlayer: "P2",
            info: `${activePlayer} Drew a card and their turns are over`,
          });
        }
      }
    } else if (activePlayer === "P2") {
      const p2Turns = p2RemainingTurns - 1;

      if (cardDrawn === "HS") {
        //Hungry shark handler
        const goatCardIndex = p2Hand.indexOf("SG");
        if (goatCardIndex !== -1) {
          p2Hand.splice(goatCardIndex, 1);

          const randomIndex = Math.floor(Math.random() * cardDeck.length);
          cardDeck.splice(randomIndex, 0, "HS");
          // setP2Cards([...p2Hand]);
          // setDrawCardsPile([...cardDeck]);
          // setPlayedCard("SG");
          // setP2RemainingTurns(p2RemainingTurns - 1);
          // socket.emit("updateGameState", {
          //   p2Cards: [...p2Hand],
          //   p1Cards: [...p1Hand],
          //   drawCardsPile: [...cardDeck],
          //   playedCard: "SG",
          //   p2RemainingTurns: p2RemainingTurns - 1,
          //   p1RemainingTurns: p1RemainingTurns,
          // });

          if (p2Turns === 0) {
            // setP1RemainingTurns(p1RemainingTurns + 1);
            // setActivePlayer("P1");
            socket.emit("updateGameState", {
              p1Cards: [...p1Hand],
              p2Cards: [...p2Hand],
              p1RemainingTurns: 1,
              p2RemainingTurns: 0,
              playedCard: "SG",
              drawCardsPile: [...cardDeck],
              activePlayer: "P1",
              info: `${activePlayer} sacrificed a goat to the shark. The Shark has accepted their sacrifice!`,
            });
          } else if (p2Turns === 1) {
            socket.emit("updateGameState", {
              p1Cards: [...p1Hand],
              p2Cards: [...p2Hand],
              p1RemainingTurns: 0,
              p2RemainingTurns: 1,
              playedCard: "SG",
              drawCardsPile: [...cardDeck],
              info: `${activePlayer} sacrificed a goat to the shark. The Shark has accepted their sacrifice!`,
            });
          }
        } else {
          // setPlayedCard("HS");
          // setGameOver(true);
          // setWinner("P1");
          // if() theWinner = userData.username
          socket.emit("updateGameState", {
            playedCard: "HS",
            gameOver: true,
            winner: "P1",
            //set winner to userData.username if currenUser === "Player 1"
          });
        }
      } else if (cardDrawn !== "HS") {
        // setDrawCardsPile([...cardDeck]);
        // setP2Cards([...p2Cards, cardDrawn]);
        // setP2RemainingTurns(rTurns);
        // socket.emit("updateGameState", {
        //   drawCardsPile: [...cardDeck],
        //   p2Cards: [...p2Cards, cardDrawn],
        //   p1Cards: [...p1Cards],
        //   p2RemainingTurns: rTurns,
        //   p1RemainingTurns: p1RemainingTurns,
        // });
        if (p2Turns === 0) {
          // setP1RemainingTurns(p1RemainingTurns + 1);
          // setActivePlayer("P1");
          socket.emit("updateGameState", {
            p2Cards: [...p2Hand, cardDrawn],
            p1Cards: [...p1Hand],
            p1RemainingTurns: 1,
            drawCardsPile: [...cardDeck],
            p2RemainingTurns: 0,
            activePlayer: "P1",
            info: `${activePlayer} Drew a card and their turns are over`,
          });
        } else if (p2Turns === 1) {
          socket.emit("updateGameState", {
            p2Cards: [...p2Hand, cardDrawn],
            p1Cards: [...p1Hand],
            p1RemainingTurns: 0,
            drawCardsPile: [...cardDeck],
            p2RemainingTurns: 1,
            activePlayer: "P1",
            info: `${activePlayer} Drew a card and they have 1 turn remaining`,
          });
        }
      }
    }
  }

  return (
    <div className={`Game`}>
      <>
      {gameOver ? null: ( 
        <div className="topInfo flex flex-row justify-center items-center bg-[#051222] bg-opacity-50 mb-10 shadow-2xl">
          <h3 className="text-2xl">
            Game Code: <span className="text-orange-700">{room}</span>
          </h3>
          <h3 className="text-2xl">
            Active Player:{" "}
            <span className="text-orange-700 text-4xl">{activePlayer}</span>
          </h3>
          <h3 className="text-2xl">
            Player remaining turns:{" "}
            <span className="text-orange-700 text-4xl">
              {activePlayer === "P1" ? p1RemainingTurns : p2RemainingTurns}
            </span>
          </h3>
        </div>
        ) }

        <>
          {gameOver ? ((winner === "P1" && currentUser === "Player 1") || (winner === "P2" && currentUser === "Player 2") ? <GameOverWon/>: <GameOverLose/>
            
          ) : (
            <div>
              {/* P1 VIEW */}
              {currentUser === "Player 1" && (
                <>
                <Player1View
                  cardPlayedHandler={cardPlayedHandler}
                  p2Cards={p2Cards}
                  activePlayer={activePlayer}
                  p1Cards={p1Cards}
                  fullname={fullname}
                  drawCardHandler={drawCardHandler}
                  info={info}
                  playedCard={playedCard}
                />
                <Chatbox 
                    toggleChatBox={toggleChatBox}
                    messages={messages}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    user="P1"
                  />
                </>
              )}

              {/* P2 VIEW */}
              {currentUser === "Player 2" && (
                <>
                <Player2View
                  cardPlayedHandler={cardPlayedHandler}
                  p2Cards={p2Cards}
                  activePlayer={activePlayer}
                  p1Cards={p1Cards}
                  fullname={fullname}
                  drawCardHandler={drawCardHandler}
                  info={info}
                  playedCard={playedCard}
                />
                  <Chatbox 
                    toggleChatBox={toggleChatBox}
                    messages={messages}
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    user="P2"
                  />
                </>
              )}
            </div>
          )}
        </>
      </>

      <br />
      <div className=" flex flex-row justify-center items-center my-5">
        <a href="/">
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:bg-orange-700 border-orange-700 bg-red-700 bg-opacity-40 hover:text-white">
            QUIT
          </button>
        </a>

        {/* Modals down here */}
        {currentUser === "Player 1"
          ? modalP1Show && (
              <ModalP1
                setModalOn={setModalP1Show}
                card1={threeCards[0]}
                card2={threeCards[1]}
                card3={threeCards[2]}
              />
            )
          : null}
        {currentUser === "Player 2"
          ? modalP2Show && (
              <ModalP2
                setModalOn={setModalP2Show}
                card1={threeCards[0]}
                card2={threeCards[1]}
                card3={threeCards[2]}
              />
            )
          : null}
      </div>
    </div>
  );
};

export default Game;
