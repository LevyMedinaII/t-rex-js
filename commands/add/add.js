const chalk = require('chalk')
const fs = require('fs')
let addInquirer = require('./add-inquirer')

/*
 * Add resource command
 *
 */
let add = async () => {
  let answers = await addInquirer()
  console.log('Add called')
}

module.exports = add