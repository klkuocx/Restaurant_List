// Include packages related to server
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

// Set view engine
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Set the server
app.get('/', (req, res) => {
  res.render('index')
})

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
