const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// route --> index page
router.get('/', (req, res) => {
  const sortOption = req.query.sort
  const userId = req.user._id

  Restaurant.find({ userId })
    .lean()
    .sort(sortOption)
    .then(restaurants => res.render('index', { restaurants, sortOption }))
    .catch(error => console.log(error))
})

module.exports = router
