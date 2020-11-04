const express = require('express')
const router = express.Router()

// route --> go to login page
router.get('/login', (req, res) => {
  res.render('login')
})

// route --> go to register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
