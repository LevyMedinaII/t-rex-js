module.exports = (IO) => {
  let router = require('express').Router()
  let Sample = require('./model.js')(IO)

  router.get('/', async (req, res) => {
    res.send(await Sample.findAll())
  })

  return router
}