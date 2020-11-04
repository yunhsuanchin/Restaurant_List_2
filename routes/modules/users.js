const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// route --> go to login page
router.get('/login', (req, res) => {
  res.render('login')
})

// route --> login request
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}))

// route --> logout request
router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/users/login')
})

// route --> go to register page
router.get('/register', (req, res) => {
  res.render('register')
})

// route --> register request
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) return console.log('This email is already exists.')
      if (password !== confirmPassword) return console.log('Password does not match.')

      return User.create({
        name,
        email,
        password
      })
    })
    .then(() => res.redirect('/users/login'))
    .catch(err => console.error(err))
})

module.exports = router
