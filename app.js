// Include packages related to server, database and view
const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.error('MongoDB error!')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

// Set view engine
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Set static files
app.use(express.static('public'))

// Set the server
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
