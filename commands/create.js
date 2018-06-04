const chalk = require('chalk')
const fs = require('fs')
const pkg = require('.././package.json')
const moment = require('moment')
let createInquirer = require('../inquirer/create')

/*
 * Project Configuration File
 *
 */
let trexConfig = {
  about: 'T-Rex Project',
  version: pkg.version,
}

/*
 * Create command
 *
 */
let create = async () => {
  // Prompt for user input [/inquirer/create.js]
  let answers = await createInquirer()
  let projectName = answers.name

  // Check if folder with project name doesn't exist
  if (!fs.existsSync(projectName)) {
    try {
      // Create project directory
      fs.mkdirSync(`${process.cwd()}/${projectName}`)
      // Add Info to project configuration
      trexConfig.project = {
        name: projectName,
        date_created: moment(),
      }
      // Write trex project file
      fs.writeFile(`${process.cwd()}/${projectName}/trex.json`,
        JSON.stringify(trexConfig, null, 4), (err) => {
          if (err) return console.log(err)
          console.log(`Project ${projectName} has been created`)
      })
    } catch (err)  {
      console.log(err)
    }
  } else {
    console.log(`Project ${projectName} already exists`)
  }
}

module.exports = create