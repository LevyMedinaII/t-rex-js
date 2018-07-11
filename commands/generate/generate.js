const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const Resource = require(`${__dirname}/../../lib/Resource`)
const ResourceGenerator = require(`${__dirname}/../../lib/ResourceGenerator`)

let generate = () => {
  try {
    console.log(chalk.grey('Generating resources from generate.json...'))

    let generatePath = `${process.cwd()}/generate.json`
    let resources = ResourceGenerator.createResourcesFromPath(generatePath)
    
    resources.map(resource => {
      ResourceGenerator.writeResource(resource)
      console.log(chalk.bgGreen(chalk.bold(' CREATE ')), `/resources/${resource.name}/${resource.name}.js`)
      console.log(chalk.bgGreen(chalk.bold(' CREATE ')), `/resources/${resource.name}/model.js`)
    })
  } catch (e) {
    console.log(chalk.bgRed(chalk.bold(' ERROR ')), e)
  }
}

module.exports = generate
