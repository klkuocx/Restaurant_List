// Include packages related to server
const express = require('express')
const app = express()
const port = 3000

// Set the server
app.get('/', (req, res) => {
  res.send('Restaurant List developed by Express')
})

// Listen to server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
