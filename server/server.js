const db = require('./config/connection');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const socketio = require('socket.io')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/players');

const http = require('http')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});

const server = http.createServer(app)

const io = socketio(server)

io.on('connection', socket => {
  socket.on('join', (payload, callback) => {
      let numberOfUsersInRoom = getUsersInRoom(payload.room).length

      const { error, newUser} = addUser({
          id: socket.id,
          name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
          room: payload.room
      })

      if(error)
          return callback(error)

      socket.join(newUser.room)

      io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
      socket.emit('currentUserData', {name: newUser.name})
      callback()
  })

  socket.on('initGameState', gameState => {
      const user = getUser(socket.id)
      if(user)
          io.to(user.room).emit('initGameState', gameState)
  })

  socket.on('updateGameState', gameState => {
      const user = getUser(socket.id)
      if(user)
          io.to(user.room).emit('updateGameState', gameState)
  })

  socket.on('sendMessage', (payload, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('message', {user: user.name, text: payload.message})
      callback()
  })

  socket.on('disconnect', () => {
      const user = removeUser(socket.id)
      if(user)
          io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
  })
})
