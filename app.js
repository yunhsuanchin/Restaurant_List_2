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

// require mongoose and set connection to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
// get mongoDB connection status
const db = mongoose.connection
db.on('error', () => {
  console.log('connection error.')
})
db.once('open', () => {
  console.log('connected!')
})

// set static files
app.use(express.static('public'))

// set routes
const routes = require('./routes')
app.use(routes)

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
