require('dotenv').config()
const db = require('./config/connection');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const socketio = require('socket.io');

const { addPlayer, removePlayer, getPlayer, getRoomPlayers } = require('./utils/players');

const http = require('http')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  server.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});

const server = http.createServer(app)

const io = socketio(server)

io.on('connection', socket => {
  console.log("Connection established");
  socket.on('join', (payload, callback) => {
      let numberOfUsersInRoom = getRoomPlayers(payload.room).length

      const { error, newPlayer} = addPlayer({
          id: socket.id,
          name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
          room: payload.room
      })

      if(error)
          return callback(error)

      socket.join(newPlayer.room)

      io.to(newPlayer.room).emit('roomData', {room: newPlayer.room, users: getRoomPlayers(newPlayer.room)})
      socket.emit('currentUserData', {name: newPlayer.name})
      callback()
  })

  socket.on('initGameState', gameState => {
      const user = getPlayer(socket.id)
      if(user)
          io.to(user.room).emit('initGameState', gameState)
  })

  socket.on('updateGameState', gameState => {
      const user = getPlayer(socket.id)
      if(user)
          io.to(user.room).emit('updateGameState', gameState)
  })

  socket.on('sendMessage', (payload, callback) => {
      const user = getPlayer(socket.id)
      io.to(user.room).emit('message', {user: user.name, text: payload.message})
      callback()
  })

  socket.on('disconnect', () => {
      const user = removePlayer(socket.id)
      if(user)
          io.to(user.room).emit('roomData', {room: user.room, users: getRoomPlayers(user.room)})
  })
})
