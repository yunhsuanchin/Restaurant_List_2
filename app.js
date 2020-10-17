// require express
const express = require('express')
const app = express()

// require handlebars and set template engine
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// require body parser
const bodyParse = require('body-parser')
app.use(bodyParse.urlencoded({ extended: true }))

// require method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require mongoose
require('./config/mongoose')

// set static files
app.use(express.static('public'))

// set routes
const routes = require('./routes')
app.use(routes)

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
