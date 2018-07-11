module.exports = (IO) => {
  const Sequelize = require('sequelize')
  const sequelize = require(`${__dirname}/../db`)
  const resource_name = '{{resource_name}}'

  const {{resource_name}} = sequelize.define(resource_name, {{model_attributes}})

  {{resource_name}}.afterCreate(() => { IO.sockets.emit(`update ${resource_name}`) })
  {{resource_name}}.afterUpdate(() => { IO.sockets.emit(`update ${resource_name}`) })
  
  {{resource_name}}.sync()
  return {{resource_name}}
}