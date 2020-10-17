// require restaurant model
const Restaurant = require('../restaurant')

// require restaurant.json
const restaurants = require('../restaurant.json')

// require mongoose
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('connected!')

  for (const restaurant of restaurants.results) {
    Restaurant.create(restaurant)
  }
  console.log('done.')
})
