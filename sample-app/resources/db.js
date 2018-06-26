const config = require('../config.json')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.db_url)

module.exports = sequelize