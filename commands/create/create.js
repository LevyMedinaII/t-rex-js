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
  let packageJson = generatePackageJson({ projName, projVersion, projDescription })
  let reactPackageJson = generateReactPackageJson({ projName, projDescription })

  generateDirectories(projName)

  fse.writeJsonSync(`${process.cwd()}/${projName}/package.json`, packageJson, { spaces: 4 })
  fse.writeJsonSync(`${process.cwd()}/${projName}/client/package.json`, reactPackageJson, { spaces: 4 })

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

let generatePackageJson = (config) => {
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
      start: 'nodemon server.js'
    },
  }

  return PACKAGE_JSON_TEMPLATE
}

let generateReactPackageJson = (config) => {
  let PACKAGE_JSON_TEMPLATE = {
    'name': 'client',
    'version': `${config.version}`,
    'description': `${config.description}`,
    'private': true,
    'proxy': 'http://localhost:5001',
    'main': 'index.js',
    'scripts': {
      'start': 'webpack --mode development',
      'build': 'webpack --mode production'
    },
    'keywords': [],
    'author': '',
    'license': 'ISC',
    'devDependencies': {
      'webpack': '^4.0.1',
      'webpack-cli': '^2.0.10'
    }
  }

  return PACKAGE_JSON_TEMPLATE
}


module.exports = create