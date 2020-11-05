if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Include package and model
const User = require('../user')
const Restaurant = require('../restaurant')
const bcrypt = require('bcryptjs')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')
const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

// Generate seeds
db.once('open', () => {
  const restaurants = restaurantList.results
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USERS[0].password, salt))
    .then(hash => {
      SEED_USERS.forEach(SEED_USER => SEED_USER.password = hash)
      return User.insertMany(SEED_USERS)
    })
    .then(users => {
      return Promise.all(restaurants.map((restaurant, index) => {
        if (index < 3) {
          restaurant.userId = users[0]._id
          return Restaurant.create(Object.assign({}, restaurant))
        }
        if (index < 6) {
          restaurant.userId = users[1]._id
          return Restaurant.create(Object.assign({}, restaurant))
        }
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
