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
  successRedirect: '/',
  failureRedirect: '/users/login',
  successFlash: true,
  failureFlash: true
}))

// route --> logout request
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', 'Successfully logout!')
  res.redirect('/users/login')
})

// route --> go to register page
router.get('/register', (req, res) => {
  res.render('register')
})

// route --> register request
router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields below are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password does not match.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('error_msg', 'This email is already exists.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      if (password !== confirmPassword) {
        req.flash('error_msg', 'Password does not match.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }

      return User.create({
        name,
        email,
        password
      })
        .then(() => next())
    })
    .catch(err => console.error(err))
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true,
  failureFlash: true
})
)

module.exports = router
