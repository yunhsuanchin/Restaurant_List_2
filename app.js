const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParse = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    if_equal: function (oldValue, newValue, option) {
      if (oldValue === newValue) {
        return option.fn(this)
      }
    }
  }
}))
app.set('view engine', 'hbs')
app.use(bodyParse.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(flash())
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
