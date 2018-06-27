module.exports = (IO) => {
  let router = require('express').Router()
  let Test = require('./model.js')(IO)

  router.get('/', async (req, res) => {
    res.send(await Test.findAll())
  })

  return router
}