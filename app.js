// Include packages related to server, database and view
const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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
app.use(bodyParser.urlencoded({ extended: true }))

// Set the route to index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// Set route to create restaurant
app.get('/restaurants/new', (req, res) => res.render('new'))

app.post('/restaurants/new', (req, res) => {
  const restaurant = req.body
  Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// Set route to read detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// Set routes to update restaurant info
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const update = req.body
  Restaurant.findByIdAndUpdate(id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// Set route to delete restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// Set route to search restaurant
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
