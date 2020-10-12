// require express
const express = require('express')
const app = express()

// require handlebars and set template engine
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set routes
app.get('/', (req, res) => {
  res.render('index')
})

// listen on
app.listen(3000, () => {
  console.log('App is running on http://localhost/3000')
})
