let router = require('express').Router()
let User = require('./model.js')

router.get('/', async (req, res) => {
  res.send( await User.findAll() )
})

router.post('/', async (req, res) => {
  User.create({
		"name": req.body.name,
		"id_number": req.body.id_number,
	})
  
  res.send('SUCCESS')
})





module.exports = router