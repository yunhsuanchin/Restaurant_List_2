const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // Middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_msg', 'This email does not exists.'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error_msg', 'The email or password is incorrect.'))
            }

            return done(null, user, req.flash('success_msg', `${user.name}, Welcome!`))
          })
      })
      .catch(err => done(err, false))
  }))

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    passReqToCallback: true,
    profileFields: ['displayName', 'email']
  }, (req, accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user, req.flash('success_msg', `${user.name}, Welcome!`))
        }

        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user, req.flash('success_msg', `${user.name}, Welcome!`)))
          .catch(err => done(err, false))
      })
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
