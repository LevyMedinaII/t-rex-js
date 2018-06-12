const chalk = require('chalk')
const fs = require('fs')
const moment = require('moment')
let createInquirer = require('./create-inquirer')

/*
 * Create command
 *
 */
let create = async () => {
  // Prompt for user input [/inquirer/create.js]
  let answers = await createInquirer()
  let projName = answers.name
  let projVersion = answers.version
  let projDescription = answers.description

  // Check if folder with project name doesn't exist
  if (!fs.existsSync(projName)) {
    try {
      // Create project directory
      fs.mkdirSync(`${process.cwd()}/${projName}`)

      let packageFile = {
        name: `${projName}`,
        version: `${projVersion}`,
        description: `${projDescription}`,
        dependencies: {
          'body-parser': '*',
          express: '*',
          pg: '*',
          'pg-hstore': '*',
          sequelize: '*',
        }
      }
      
      // Write package file
      fs.writeFile(`${process.cwd()}/${projName}/package.json`,
        JSON.stringify(packageFile, null, 4), (err) => {
          if (err) return console.log(err)
          console.log(`Project ${projName} has been created`)
      })
    } catch (err)  {
      console.log(err)
    }
  } else {
    console.log(`Project ${projName} already exists`)
  }
}

module.exports = create