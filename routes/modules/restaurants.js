// require express & express.router
const express = require('express')
const router = express.Router()

// require Restaurant model
const Restaurant = require('../../models/restaurant')

// route --> search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

// route --> go to detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// route --> go to new page
router.get('/', (req, res) => {
  res.render('new')
})

// route --> add a new restaurant to database
router.post('/', (req, res) => {
  const newRestaurant = Object.assign({}, req.body)

  if (newRestaurant.image === '') {
    newRestaurant.image = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
  }

  Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// route --> go to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      const category = restaurant.category
      res.render('edit', { restaurant, category })
    })
    .catch(error => console.log(error))
})

// route --> edit restaurant
router.put('/:id', (req, res) => {
  const id = req.params.id
  // console.log('body', req.body)
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// route --> delete a restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
