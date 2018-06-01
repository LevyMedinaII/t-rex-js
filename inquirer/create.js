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
  frontend: [
    { name: 'HTML/CSS' },
    { name: 'ReactJS' },
  ],
  database: [
    { name: 'PostgreSQL' },
    { name: 'MariaDB' },
    { name: 'MongoDB' },
  ]
}


/**
 * Create inquirer questions
 * 
 */
let questions = [
  { type: 'input', name: 'name', message: 'Enter Project Name:' },
  { type: 'list', name: 'frontend', message: 'Choose Front-End Library:', choices: values.frontend },
  { type: 'list', name: 'database', message: 'Choose Database', choices: values.database },
]

module.exports = async () => {
  let answers = await inquirer.prompt(questions)
  
  console.log()
  console.log(chalk.bold.green('APP CONFIGURATION'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Project Name:'), answers.name)
  console.log(chalk.grey('Frontend Library:'), answers.frontend)
  console.log(chalk.grey('Database:'), answers.database)
  console.log()

  return answers
}
