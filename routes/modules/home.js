// require express & express.router
const express = require('express')
const router = express.Router()

// require Restaurant model
const Restaurant = require('../../models/restaurant')

// route --> index page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('_id')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sort --> name-asc
router.get('/name-asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('name')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sort --> name-desc
router.get('/name-desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('-name')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sort --> id-asc
router.get('/id-asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('_id')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sort --> id-desc
router.get('/id-desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('-_id')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sort --> category
router.get('/category', (req, res) => {
  Restaurant.find()
    .lean()
    .sort('-_id')
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})



module.exports = router
