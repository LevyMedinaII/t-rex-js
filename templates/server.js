/* == PACKAGE IMPORTS == */
const bodyParser = require('body-parser')
const config = require('./config.json')
const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const APP = express()
const APP_PORT = config.backend_port

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
// APP.use(express.static(path.join(__dirname, 'client/dist')))

const resources = require('./resources/index')(IO)

if (resources !== undefined || resources.length > 0)
  resources.map(resource => { APP.use(`${resource.path}`, resource.location) })

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// APP.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/dist/index.html'));
// })

/* == START SERVER == */
SERVER.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))
