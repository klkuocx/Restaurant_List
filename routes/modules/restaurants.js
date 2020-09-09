const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Set route to create restaurant
router.get('/new', (req, res) => res.render('new'))

router.post('/new', (req, res) => {
  const restaurant = req.body
  Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// Set route to read detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// Set routes to update restaurant info
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  Restaurant.findByIdAndUpdate(id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// Set route to delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
