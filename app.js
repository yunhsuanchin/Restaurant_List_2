// require express
const express = require('express')
const app = express()

// require handlebars and set template engine
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// require body parser
const bodyParse = require('body-parser')
app.use(bodyParse.urlencoded({ extended: true }))

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

// require Restaurant model
const Restaurant = require('./models/restaurant')

// set static files
app.use(express.static('public'))

// set routes
// routes --> index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// routes --> go to show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// routes --> search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
