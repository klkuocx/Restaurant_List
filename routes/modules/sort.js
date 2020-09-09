const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Set route to sort restaurants
router.get('/', (req, res) => {
  const sortBy = req.query.by
  let byMethod = {}
  switch (sortBy) {
    case 'name-asc':
      byMethod = { name: 'asc' }
      break
    case 'name-desc':
      byMethod = { name: 'desc' }
      break
    case 'category':
      byMethod = { category: 'asc' }
      break
    case 'location':
      byMethod = { location: 'asc' }
      break
  }
  Restaurant.find()
    .lean()
    .sort(byMethod)
    .then(restaurants => res.render('index', { restaurants, sortBy }))
    .catch(error => console.error(error))
})

module.exports = router
