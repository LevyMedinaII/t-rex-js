#!/usr/bin/env node
'use strict'
/**
 * Require dependencies
 *
 */
const inquirer = require('inquirer')
const chalk = require('chalk')

const isValid = (str) => {
  if (str && !(/\s/.test(str))) return true
  else return false
}
/**
 * Values for inquirer questions
 * 
 */
const QUESTION_VALUES = {
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
const QUESTIONS = [
  {
    type: 'input',
    name: 'resourceName',
    message: 'Enter Resource Name:',
    validate: isValid
  },
  {
    type: 'confirm',
    name: 'createView',
    message: 'Create View?',
  },
  {
    type: 'checkbox',
    name: 'createResource',
    message: 'Choose Resources:',
    choices: QUESTION_VALUES.resource_types,
  },
]

module.exports = async () => {
  let answers = await inquirer.prompt(QUESTIONS)

  console.log()
  console.log(chalk.bold.green('ADDED RESOURCE'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Resource Name:'), answers.resourceName)
  console.log(chalk.grey('Add View?'), answers.createView)
  console.log(chalk.grey('Resources:'), answers.createResource)
  console.log()

  return answers
}
