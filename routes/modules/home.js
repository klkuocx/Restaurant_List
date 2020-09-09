const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Set the route to home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router
