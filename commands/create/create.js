const chalk = require('chalk')
const fse = require('fs-extra')
const moment = require('moment')
let createInquirer = require('./inquirer')

/* == Create command == */
let create = async () => {
  // Prompt for user input [./inquirer.js]
  let answers = await createInquirer()

  let projName = answers.name
  let projVersion = answers.version
  let projDescription = answers.description

  generateDirectories(projName)
  fse.writeJsonSync(
    `${process.cwd()}/${projName}/package.json`,
    generatePackageJSON({ projName, projVersion, projDescription }),
    { spaces: 4 }
  )

  // Populate folders with template files
  fse.copySync(`${__dirname}/../../templates/server.js`, `${process.cwd()}/${projName}/server.js`)
  fse.copySync(`${__dirname}/../../templates/config.json`, `${process.cwd()}/${projName}/config.json`)
  fse.copySync(`${__dirname}/../../templates/resources`, `${process.cwd()}/${projName}/resources`)

  console.log(`Project ${projName} has been created`)
}

/* == Misc Functions == */
let generateDirectories = (projName) => {
  fse.ensureDirSync(`${process.cwd()}/${projName}`)
  fse.ensureDirSync(`${process.cwd()}/${projName}/client`)
  fse.ensureDirSync(`${process.cwd()}/${projName}/resources`)
}

let generatePackageJSON = (config) => {
  let PACKAGE_JSON_TEMPLATE = {
    name: `${config.projName}`,
    version: `${config.projVersion}`,
    description: `${config.projDescription}`,
    dependencies: {
      'body-parser': '*',
      'express': '*',
      'pg': '*',
      'pg-hstore': '*',
      'sequelize': '*',
      'socket.io':  '*'
    },
    devDependencies: {
      nodemon: '*'
    },
    scripts: {
      start: "nodemon server.js"
    },
  }

  return PACKAGE_JSON_TEMPLATE
}

module.exports = create