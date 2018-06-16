/* == PACKAGE IMPORTS == */
const express = require('express')
const bodyParser = require('body-parser')

/* == MIDDLEWARE == */
// Enable JSON request data auto-parsing
APP.use(bodyParser.json())
// Enable x-www-form-urlencoded
APP.use(bodyParser.urlencoded({ extended: true }))

let APP = express()



const APP_PORT = process.env.port || '5001'
app.listen(port, () => {
  console.log('App running at port', port)
})