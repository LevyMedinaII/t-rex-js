const inquirer = require('inquirer')
const chalk = require('chalk')

const isValid = (str) => {
  if (str && !(/\s/.test(str))) return true
  else return false
}

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
    name: 'enableSocket',
    message: 'Enable SocketIO for this resource?',
  },
  // {
  //   type: 'checkbox',
  //   name: 'createResource',
  //   message: 'Choose Resources:',
  //   choices: QUESTION_VALUES.resource_types,
  // },
]

module.exports = async () => {
  let answers = await inquirer.prompt(QUESTIONS)
  answers.resourceName = answers.resourceName.toLowerCase()
  return answers
}
