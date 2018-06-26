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

const isValid = (str) => {
  if (str && !(/\s/.test(str))) return true
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
  { type: 'input', name: 'name', message: 'Enter Project Name:', validate: isValid },
  { type: 'input', name: 'version', message: 'Enter Version [ Format| x.x.x ]:', default: DEFAULT_VER },
  { type: 'input', name: 'description', message: 'Enter Description:', default: DEFAULT_DESC },
  // { type: 'list', name: 'frontend', message: 'Choose Front-End Library:', choices: values.frontend },
  // { type: 'list', name: 'database', message: 'Choose Database', choices: values.database },
]

module.exports = async () => {
  let answers = await inquirer.prompt(QUESTIONS)
  return answers
}
