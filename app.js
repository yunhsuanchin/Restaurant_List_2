// require express
const express = require('express')
const app = express()

// require handlebars and set template engine
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// require mongoose and set connection to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('connection error.')
})
db.once('open', () => {
  console.log('connected!')
})

// set routes
app.get('/', (req, res) => {
  res.render('index')
})

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
