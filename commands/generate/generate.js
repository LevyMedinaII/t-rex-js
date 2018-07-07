const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const ResourceCreator = require(`${__dirname}/../../lib/ResourceCreator`)

let generate = () => {
  console.log(chalk.green('Generating resources from generate.json...'))
  try {
    const generator = require(`${process.cwd()}/generate.json`)
    for (const key in generator.resources) {
      const resource = generator['resources'][key]
      const config = {
        
      }
    }
  } catch (e) {
    console.log(chalk.red(e))
    throw new Error('RESOURCE GENERATION ERROR')
  }
}

module.exports = generate
