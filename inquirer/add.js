#!/usr/bin/env node
'use strict'
/**
 * Require dependencies
 *
 */

const inquirer = require('inquirer')
const chalk = require('chalk')
/**
 * Values for inquirer questions
 * 
 */
const values = {
  resource_types: [
    { name: 'CREATE' },
    { name: 'READ' },
    { name: 'UPDATE' },
    { name: 'DESTROY' },
  ],
}

/**
 * Create inquirer questions
 * 
 */
let questions = [
  { type: 'input', name: 'resource_name', message: 'Enter Resource Name:' },
  { type: 'confirm', name: 'create_view', message: 'Create View?' },
  { type: 'checkbox', name: 'create_resource', message: 'Choose Resources:', choices: values.resource_types },
]

module.exports = async () => {
  let answers = await inquirer.prompt(questions)
  
  console.log()
  console.log(chalk.bold.green('ADDED RESOURCE'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Resource Name:'), answers.resource_name)
  console.log(chalk.grey('Add View?'), answers.create_view)
  console.log(chalk.grey('Resources:'), answers.create_resource)
  console.log()

  return answers
}
