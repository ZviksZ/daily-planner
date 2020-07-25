const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const PORT = process.env.PORT || '8888';


const app = express()
const server = http.createServer(app);

app.use(express.json({extended: true}))

app.use(cors());

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/todo', require('./routes/todo.routes.js'))
app.use('/api/video', require('./routes/video.routes.js'))
app.use('/api/english', require('./routes/english.routes.js'))
app.use('/api/project', require('./routes/project.routes.js'))
app.use('/api/pattern', require('./routes/pattern.routes.js'))

async function start() {
   try {
      const uri = "mongodb+srv://viks2332:viks2332@cluster0-pkgbb.azure.mongodb.net/daily-planner"
      await mongoose.connect(uri, {
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

start();
