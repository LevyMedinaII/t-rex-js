const chalk = require('chalk')
const fs = require('fs')
const moment = require('moment')
let createInquirer = require('./create-inquirer')

/*
 * package.json template
 * 
 */
let PACKAGE_JSON_TEMPLATE = {
  name: ``,
  version: ``,
  description: ``,
  dependencies: {
    'body-parser': '*',
    express: '*',
    pg: '*',
    'pg-hstore': '*',
    sequelize: '*',
  },
  devDependencies: {
    nodemon: '*'
  }
}

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

      PACKAGE_JSON_TEMPLATE.name =  `${projName}`
      PACKAGE_JSON_TEMPLATE.version = `${projVersion}`,
      PACKAGE_JSON_TEMPLATE.description = `${projDescription}`,
      
      // Write package file
      fs.writeFile(`${process.cwd()}/${projName}/package.json`,
        JSON.stringify(PACKAGE_JSON_TEMPLATE, null, 4), (err) => {
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