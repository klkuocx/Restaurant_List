const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Set route to search restaurant
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const target = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: target, keyword })
    })
    .catch(error => console.error(error))
})

module.exports = router
