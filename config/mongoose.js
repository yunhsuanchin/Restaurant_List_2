// require mongoose and set connection to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// get mongoDB connection status
const db = mongoose.connection
db.on('error', () => {
  console.log('connection error.')
})
db.once('open', () => {
  console.log('connected!')
})

module.exports = db
