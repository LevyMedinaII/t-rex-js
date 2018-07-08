const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')

let generate = () => {
  try {
    console.log(chalk.green('Generating resources from generate.json...'))
  } catch (e) {
    console.log(chalk.red(e))
    throw new Error('RESOURCE GENERATION ERROR')
  }
}

module.exports = generate
