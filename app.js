// Include packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const comparison = hbshelpers.comparison()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

// Declare variables related to server and database
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000

// Set view engine
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ helpers: comparison, defaultLayout: 'main' }))

// Set middlewares
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
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
