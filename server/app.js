const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const PORT = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//const router = require('./chat.routes.js');

const app = express()
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json({extended: true}))

app.use(cors());

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/todo', require('./routes/todo.routes.js'))
app.use('/api/video', require('./routes/video.routes.js'))
app.use('/api/english', require('./routes/english.routes.js'))
app.use('/api/project', require('./routes/project.routes.js'))
app.use('/api/pattern', require('./routes/pattern.routes.js'))
//app.use('/api/chat', require('./routes/chat.routes.js'));

app.get('/api/chat', function (req, res) {
   console.log('hello23')
})



io.on('connect', (socket) => {
   socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if(error) return callback(error);

      socket.join(user.room);

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      callback();
   });

   socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message });

      callback();
   });

   socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if(user) {
         io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
   })
});


async function start() {
   try {
      await mongoose.connect('mongodb+srv://viks2332:viks2332@cluster0-pkgbb.azure.mongodb.net/daily-planner', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      }).then(() => console.log('database connected'))
      server.listen(PORT, () => {
         console.log(`App has been started on port ${PORT}...`)
      })
   } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
   }
}

start()
