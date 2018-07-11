const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const Resource = require(`${__dirname}/../../lib/Resource`)
const ResourceGenerator = require(`${__dirname}/../../lib/ResourceGenerator`)
let addInquirer = require(`${__dirname}/inquirer`)

let add = async () => {
  let answers = await addInquirer()

  try {
    console.log(chalk.grey(`Adding resource ${answers.name}...`))

    let generatePath = `${process.cwd()}/generate.json`
    let resource = new Resource(answers.name, answers.methods, null, answers.socket)
    
    ResourceGenerator.writeResource(resource)
  } catch (e) {
    if (e.message)
      console.log(chalk.bgRed(chalk.bold(' ERROR ')), e.message)
    else
      console.log(chalk.bgRed(chalk.bold(' ERROR ')), e)
  }
}

module.exports = add
