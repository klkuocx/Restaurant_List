const express = require('express')
const router = express.Router()

// route of home page
const home = require('./modules/home')
router.use('/', home)

// routes to CRUD restaurants
const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

// Set route to search restaurants
const search = require('./modules/search')
router.use('/search', search)

// Set route to sort restaurants
const sort = require('./modules/sort')
router.use('/sort', sort)

module.exports = router
