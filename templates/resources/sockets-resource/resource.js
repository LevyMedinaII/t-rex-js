module.exports = (IO) => {
  let router = require('express').Router()
  let {{resource_name}} = require('./model.js')(IO)

  router.get('/', async (req, res) => {
    res.send(await {{resource_name}}.findAll())
  })

  return router
}