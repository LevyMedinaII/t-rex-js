let router = require('express').Router()
let {{resource_name}} = require('./model.js')

router.get('/', async (req, res) => {
  res.send(await {{resource_name}}.findAll())
})

module.exports = router