#!/usr/bin/env node
'use strict'
/**
 * Require dependencies
 *
 */

const inquirer = require('inquirer')
const chalk = require('chalk')

const DEFAULT_VER = '0.0.1'
const DEFAULT_DESC = 'A sample full-stack application generated with T-RexJS'

const isEmpty = (str) => {
  if (str) return true
  else return false
}
/**
 * Values for inquirer questions
 * 
 */
// const values = {
//   frontend: [
//     { name: 'HTML/CSS' },
//     { name: 'ReactJS' },
//   ],
//   database: [
//     { name: 'PostgreSQL' },
//     { name: 'MariaDB' },
//     { name: 'MongoDB' },
//   ]
// }


/**
 * Create inquirer questions
 * 
 */
const QUESTIONS = [
  { type: 'input', name: 'name', message: 'Enter Project Name:', validate: isEmpty },
  { type: 'input', name: 'version', message: 'Enter Version [ Format| x.x.x ]:', default: DEFAULT_VER },
  { type: 'input', name: 'description', message: 'Enter Description:', default: DEFAULT_DESC },
  // { type: 'list', name: 'frontend', message: 'Choose Front-End Library:', choices: values.frontend },
  // { type: 'list', name: 'database', message: 'Choose Database', choices: values.database },
]

module.exports = async () => {
  let answers = await inquirer.prompt(QUESTIONS)
  
  console.log()
  console.log(chalk.bold.green('APP CONFIGURATION'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Project Name:'), answers.name)
  console.log(chalk.grey('Project Version:'), answers.version)
  console.log(chalk.grey('Project Description:'), answers.description)
  console.log()

  return answers
}
