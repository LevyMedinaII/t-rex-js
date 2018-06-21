/* == PACKAGE IMPORTS == */
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io')

const APP = express()
const APP_PORT = '5001'

/* == ENABLE SOCKET.IO ==  */
const SERVER = http.createServer(APP)
const IO = socketIO(SERVER)

IO.on('connection', socket => {
  console.log('Connection established.')

  socket.on('disconnect', () => {
    console.log('Disconnected socket.')
  })
})

/* == MIDDLEWARE == */
// Enable JSON request data auto-parsing
APP.use(bodyParser.json())
// Enable x-www-form-urlencoded
APP.use(bodyParser.urlencoded({ extended: true }))

const resources = require('./resources/index')(IO)
resources.map(resource => { APP.use(resource.path, resource.location) })

/* == START SERVER == */
SERVER.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))
