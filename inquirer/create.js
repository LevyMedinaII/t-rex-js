#!/usr/bin/env node
'use strict';
/**
 * Require dependencies
 *
 */

const inquirer = require('inquirer'),
  values = require('./values'),
  chalk = require('chalk');


/**
 * Create inquirer questions
 * 
 */
const questions = [
  { type: 'list', name: 'frontEndLibrary', message: 'Choose Front-End Library:', choices: values.frontend },
  { type: 'list', name: 'database', message: 'Choose your sugar level', choices: values.database },
];

module.exports = () => {
  inquirer
    .prompt(questions)
    .then(function (answers) {
      console.log('App Configuration');
      console.log('------------------');

      console.log(chalk.grey('Frontend Library'), answers.frontend);
      console.log(chalk.grey('Database'), answers.database);
    });
}
