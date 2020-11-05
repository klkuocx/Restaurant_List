// Include packages
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const useExphbs = require('./config/exphbs')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Declare variables related to server and database
const routes = require('./routes')
require('./config/mongoose')
const app = express()

// Set middlewares
useExphbs(app)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'WhySoSerious',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

// Set the routes
app.use(routes)

// Listen to server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`)
})
