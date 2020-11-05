const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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

  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Except for name, all fields below are required.' })
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
        errors.push({ message: 'This email is already exists.' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }

      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => next())
        .catch(err => console.error(err))
    })
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  successFlash: true,
  failureFlash: true
})
)

module.exports = router
