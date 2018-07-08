const Sequelize = require('sequelize')
const sequelize = require(`${__dirname}/../db`)
const resource_name = '{{resource_name}}'

const {{resource_name}} = sequelize.define(resource_name, {{ model_attributes }})

{{resource_name}}.sync()

module.exports = {{resource_name}}