module.exports = (IO) => {
  let router = require('express').Router()
  let Sample = require('./model.js')(IO)

  router.get('/', async (req, res) => {
    res.send(await Sample.findAll())
  })

  router.post('/', async (req, res) => {
    res.send(await Sample.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }))
  })

  return router
}