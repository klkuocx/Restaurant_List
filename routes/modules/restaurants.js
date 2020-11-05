const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// Set route to create restaurant
router.get('/new', (req, res) => res.render('new'))

router.post('/new', (req, res) => {
  const restaurant = req.body
  restaurant.userId = req.user._id
  Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// Set route to read detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// Set routes to update restaurant info
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const update = req.body
  update.userId = req.user._id
  Restaurant.findByIdAndUpdate(_id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

// Set route to delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
