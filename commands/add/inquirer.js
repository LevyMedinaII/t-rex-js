const inquirer = require('inquirer')
const chalk = require('chalk')

const isValid = (str) => {
  if (str && !(/\s/.test(str))) return true
  else return false
}

const QUESTION_VALUES = {
  resource_types: [
    { name: 'GET', value: 'GET' },
    { name: 'POST', value: 'POST' },
    { name: 'PUT', value: 'PUT' },
    { name: 'DELETE', value: 'DELETE' },
  ],
}

/**
 * Create inquirer questions
 * 
 */
const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter Resource Name:',
    validate: isValid
  },
  {
    type: 'confirm',
    name: 'socket',
    message: 'Enable SocketIO for this resource?',
  },
  {
    type: 'checkbox',
    name: 'methods',
    message: 'Select methods for resource:',
    choices: QUESTION_VALUES.resource_types,
  }
]

module.exports = async () => {
  let answers = await inquirer.prompt(QUESTIONS)
  console.log()
  answers.name = answers.name.toLowerCase()

  return answers
}
