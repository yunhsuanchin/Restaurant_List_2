const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // Middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Strategies
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email does not exists.' })
        }
        if (password !== user.password) {
          return done(null, false, { message: 'The email or password is incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // Sessions
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}
