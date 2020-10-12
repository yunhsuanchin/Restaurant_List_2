// require mongoose and restaurant model
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// require restaurant.json
const restaurants = require('../restaurant.json')

// set connection to mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('error.')
})

db.once('open', () => {
  console.log('connected!')

  for (const restaurant of restaurants.results) {
    Restaurant.create(restaurant)
  }

  console.log('done.')
})
