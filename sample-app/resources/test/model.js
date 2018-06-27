module.exports = (IO) => {
  const Sequelize = require('sequelize')
  const sequelize = require('../db')
  const resource_name = 'Test'

  const Test = sequelize.define(resource_name, {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING, allowNull: false }
  })

  Test.afterCreate(() => { IO.sockets.emit(`update ${resource_name}`) })
  Test.afterUpdate(() => { IO.sockets.emit(`update ${resource_name}`) })
  
  Test.sync()
  return Test
}