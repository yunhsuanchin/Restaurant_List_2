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

// require method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

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
// route --> index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// route --> go to detail page
app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// route --> search function
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

// route --> go to new page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// route --> add a new restaurant to database
app.post('/restaurants', (req, res) => {
  const newRestaurant = Object.assign({}, req.body)

  if (newRestaurant.image === '') {
    newRestaurant.image = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
  }

  Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// route --> go to edit page
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// route --> edit restaurant
app.put('/restaurant/:id', (req, res) => {
  const id = req.params.id
  console.log('body', req.body)
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

// route --> delete a restaurant
app.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
