const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// route --> search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))

      if (!filterRestaurants.length) {
        req.flash('warning_msg', `Sorry, there is nothing that matches "${keyword}".`)
        return res.redirect('/')
      }

      res.render('index', { restaurants: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

// route --> go to a restaurant's detail page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ userId, _id })
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
  newRestaurant.userId = req.user._id

  if (newRestaurant.image === '') {
    newRestaurant.image = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
  }

  Restaurant.create(newRestaurant)
    .then(() => {
      req.flash('success_msg', 'Successfully added a new restaurant to your favorite!')
      return res.redirect('/')
    })
    .catch(error => console.log(error))
})

// route --> go to edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => {
      const category = restaurant.category
      res.render('edit', { restaurant, category })
    })
    .catch(error => console.log(error))
})

// route --> edit restaurant
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(restaurant => {
      req.flash('success_msg', `Successfully edited details of "${restaurant.name}".`)
      return res.redirect(`/restaurants/${_id}`)
    })
    .catch(error => console.log(error))
})

// route --> delete a restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(restaurant => {
      req.flash('success_msg', `Successfully delete "${restaurant.name}"`)
      return res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router
