// Include packages related to server, database and view
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
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
app.engine('handlebars', exphbs({ helpers: hbshelpers(), defaultLayout: 'main' }))

// Set middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Set the routes
app.use(routes)

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
