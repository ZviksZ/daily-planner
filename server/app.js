const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/todo', require('./routes/todo.routes.js'))


async function start() {
   try {
      await mongoose.connect('mongodb+srv://viks2332:viks2332@cluster0-pkgbb.azure.mongodb.net/daily-planner', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      }).then(() => console.log('database connected'))
      app.listen(PORT, () => {
         console.log(`App has been started on port ${PORT}...`)
      })
   } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
   }
}

start()