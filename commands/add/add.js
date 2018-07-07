const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const ResourceCreator = require(`${__dirname}/../../lib/ResourceCreator`)
let addInquirer = require('./inquirer')

let add = async () => {
  try {
    let answers = await addInquirer()

    ResourceCreator.addResource(answers)

    printSuccessMessage(answers)
  } catch (err) {
    console.log(chalk.red(err))
  }
}

/* == MISC Functions == */
let printSuccessMessage = (answers) => {
  console.log()
  console.log(chalk.bold.green('ADDED RESOURCE'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Resource Name:'), answers.resourceName)
  console.log(chalk.grey('Enable SocketsIO?'), answers.enableSocket)
  // console.log(chalk.grey('Resources:'), answers.createResource)
  console.log()
}

module.exports = add