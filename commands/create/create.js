const chalk = require('chalk')
const fse = require('fs-extra')
const moment = require('moment')
let createInquirer = require('./inquirer')

let create = async () => {
  let answers = await createInquirer()
  let projName = answers.name
  let projVersion = answers.version
  let projDescription = answers.description
  let packageJson = generatePackageJson({ projName, projVersion, projDescription })
  let reactPackageJson = generateReactPackageJson({ projVersion, projDescription })

  try {
    generateDirectories(projName)

    fse.writeJsonSync(`${process.cwd()}/${projName}/package.json`, packageJson, { spaces: 4 })
    fse.writeJsonSync(`${process.cwd()}/${projName}/client/package.json`, reactPackageJson, { spaces: 4 })

    fse.copySync(`${__dirname}/../../templates/server.js`, `${process.cwd()}/${projName}/server.js`)
    fse.copySync(`${__dirname}/../../templates/config.json`, `${process.cwd()}/${projName}/config.json`)
    fse.copySync(`${__dirname}/../../templates/generate.json`, `${process.cwd()}/${projName}/generate.json`)
    fse.copySync(`${__dirname}/../../templates/resources/db.js`, `${process.cwd()}/${projName}/resources/db.js`)
    fse.copySync(`${__dirname}/../../templates/resources/index.js`, `${process.cwd()}/${projName}/resources/index.js`)
    fse.copySync(`${__dirname}/../../templates/client`, `${process.cwd()}/${projName}/client`)
    
    printSuccessMessage(projName, answers)
  } catch (err) {
    console.log(err)
  }
}

/* == Misc Functions == */
let generateDirectories = (projName) => {
  if (fse.pathExistsSync(`${process.cwd()}/${projName}`))
    throw new Error(`Project ${chalk.red(projName)} already exists.`)
  else {
    fse.ensureDirSync(`${process.cwd()}/${projName}`)
    fse.ensureDirSync(`${process.cwd()}/${projName}/client`)
    fse.ensureDirSync(`${process.cwd()}/${projName}/client/src/components`)
    fse.ensureDirSync(`${process.cwd()}/${projName}/resources`)
  }
}

let generatePackageJson = (config) => {
  let PACKAGE_JSON_TEMPLATE = {
    name: `${config.projName}`,
    version: `${config.projVersion}`,
    description: `${config.projDescription}`,
    'dependencies': {
      'body-parser': '^1.18.3',
      'express': '^4.16.3',
      'pg': '^7.4.3',
      'pg-hstore': '^2.3.2',
      'sequelize': '^4.38.0',
      'socket.io': '^2.1.1'
    },
    'devDependencies': {
      'nodemon': '^1.17.5'
    },
    scripts: {
      start: 'node server.js'
    },
  }

  return PACKAGE_JSON_TEMPLATE
}

let generateReactPackageJson = (config) => {
  let PACKAGE_JSON_TEMPLATE = {
    'name': 'client',
    'version': `${config.projVersion}`,
    'description': `${config.projDescription}`,
    'private': true,
    'proxy': 'http://localhost:5001',
    'main': 'index.js',
    'scripts': {
      'start': 'webpack-dev-server --mode development --open --hot',
      'build': 'webpack --mode production'
    },
    'keywords': [],
    'author': '',
    'license': 'ISC',
    'devDependencies': {
      'babel-core': '^6.26.3',
      'babel-loader': '^7.1.4',
      'babel-plugin-transform-async-to-generator': '^6.24.1',
      'babel-plugin-transform-runtime': '^6.23.0',
      'babel-preset-env': '^1.7.0',
      'babel-preset-react': '^6.24.1',
      'css-loader': '^0.28.11',
      'html-webpack-plugin': '^3.2.0',
      'style-loader': '^0.21.0',
      'webpack': '^4.0.1',
      'webpack-cli': '^2.0.10',
      'webpack-dev-server': '^3.1.4'
    },
    'dependencies': {
      'axios': '0.18.0',
      'babel-plugin-transform-class-properties': '^6.24.1',
      'react': '^16.4.1',
      'react-dom': '^16.4.1',
      'socket.io-client': '^2.1.1'
    }
  }

  return PACKAGE_JSON_TEMPLATE
}

let printSuccessMessage = (projName, answers) => {
  // Print success
  console.log(`Project ${chalk.bold.green(projName)} has been created`)
  console.log()
  console.log(chalk.bold.green('APP CONFIGURATION'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Project Name:'), answers.name)
  console.log(chalk.grey('Project Version:'), answers.version)
  console.log(chalk.grey('Project Description:'), answers.description)
  console.log()
}

let replaceString = (file, target, value) => {
  try {
    let data = fse.readFileSync(file, 'utf8')
    let result = data.replace(target, value)
    fse.writeFileSync(file, result, 'utf8')
  } catch (err) {
    throw err
  }
}

module.exports = create