const Sequelize = require('sequelize')
const sequelize = require(`${__dirname}/../db`)
const resource_name = 'User'

const User = sequelize.define(resource_name, {
	"name": INTEGER,
	"id_number": STRING,
})

User.sync()

module.exports = User