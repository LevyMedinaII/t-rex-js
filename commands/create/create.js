const chalk = require('chalk')
const fs = require('fs')
const moment = require('moment')
let createInquirer = require('./inquirer')

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

/*
 * Create command
 *
 */
let create = async () => {
  // Prompt for user input [./inquirer.js]
  let answers = await createInquirer()
  let projName = answers.name
  let projVersion = answers.version
  let projDescription = answers.description

  try {
    // Create project directory
    fs.mkdirSync(`${process.cwd()}/${projName}`)
    
    // Create folder structure
    fs.mkdirSync(`${process.cwd()}/${projName}/ui`)
    fs.mkdirSync(`${process.cwd()}/${projName}/resources`)
    fs.mkdirSync(`${process.cwd()}/${projName}/resources/db`)
    fs.mkdirSync(`${process.cwd()}/${projName}/resources/sample-resource`)

    // Create package.json file
    PACKAGE_JSON_TEMPLATE.name =  `${projName}`
    PACKAGE_JSON_TEMPLATE.version = `${projVersion}`,
    PACKAGE_JSON_TEMPLATE.description = `${projDescription}`,

    fs.writeFile(`${process.cwd()}/${projName}/package.json`,
      JSON.stringify(PACKAGE_JSON_TEMPLATE, null, 4), (err) => {
        if (err) throw new Error(err)
    })

    // Create files
    fs
      .createReadStream(__dirname + '/../../templates/server.js')
      .pipe(fs.createWriteStream(`${process.cwd()}/${projName}/server.js`))

    console.log(`Project ${projName} has been created`)
  } catch (err)  {
    console.log(err)
  }
}

module.exports = create