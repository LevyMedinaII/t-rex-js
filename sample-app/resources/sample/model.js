module.exports = (IO) => {
  const Sequelize = require('sequelize')
  const sequelize = require('../db')
  const resource_name = 'sample'

  let Sample = sequelize.define(resource_name, {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING, allowNull: false }
  })

  Sample.afterCreate(() => { IO.sockets.emit(`update ${resource_name}`) })
  Sample.afterUpdate(() => { IO.sockets.emit(`update ${resource_name}`) })

  Sample.sync()
  return Sample
}