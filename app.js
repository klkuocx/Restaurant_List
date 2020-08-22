// Include packages related to server
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// Set view engine
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Set static files
app.use(express.static('public'))

// Set the server
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
