const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const comparison = hbshelpers.comparison()
module.exports = app => {
  // Set view engine
  app.set('view engine', 'handlebars')
  app.engine('handlebars', exphbs({ helpers: comparison, defaultLayout: 'main' }))
}
