// Include package and model
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

// Generate seeds
db.once('open', () => {
  const restaurants = restaurantList.results
  restaurants.forEach(restaurant => {
    Restaurant.create(Object.assign({}, restaurant))
  })
  console.log('done')
})
