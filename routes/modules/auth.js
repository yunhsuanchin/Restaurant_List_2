const express = require('express')
const router = express.Router()
const passport = require('passport')

// route --> facebook login request
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  successFlash: true,
  failureFlash: true
}))

module.exports = router
