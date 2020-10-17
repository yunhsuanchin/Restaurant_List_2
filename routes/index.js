// require express & express.router
const express = require('express')
const router = express.Router()

// require home.js & restaurant.js
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router
