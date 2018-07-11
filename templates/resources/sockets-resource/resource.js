module.exports = (IO) => {
  let router = require('express').Router()
  let {{resource_name}} = require('./model.js')(IO)
  
  {{GET}}

  {{POST}}

  {{PUT}}

  {{DELETE}}

  return router
}