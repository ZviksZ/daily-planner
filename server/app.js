const express = require('express')
/*const config = require('config')*/
const path = require('path')
const mongoose = require('mongoose')

const PORT = 5000

const app = express()

app.use(express.json({extended: true}))

// app.use('/api/auth', require('./routes/auth.routes.js'))
// app.use('/api/link', require('./routes/link.routes.js'))
// app.use('/t', require('./routes/redirect.routes.js'))


async function start() {
   try {
      /*await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })*/
      app.listen(PORT, () => {
         console.log(`App has been started on port ${PORT}...`)
      })
   } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
   }
}

start()