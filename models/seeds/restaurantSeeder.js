if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const restaurants = require('../restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')

db.once('open', () => {
  const newRestaurantList = []
  User.find()
    .then(users => {
      restaurants.results.splice(6, 2)
      restaurants.results.map((restaurant, index) => {
        if (index < 3) {
          restaurant.userId = users[0]._id
        } else if (index > 2 && index < 6) {
          restaurant.userId = users[1]._id
        }
        newRestaurantList.push(restaurant)
      })
      return newRestaurantList
    })
    .then(newRestaurantList => {
      return Restaurant.insertMany(newRestaurantList)
    })
    .then(() => {
      console.log('Done for restaurantSeeder creation.')
      process.exit()
    })
})
