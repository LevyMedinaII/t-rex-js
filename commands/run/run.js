const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')

/*
 * Add resource command
 *
 */
let run = async () => {
  const { exec } = require( 'child_process' )
  const child = await exec('npm start\ncd client\nnpm start')
  const child_client = await exec('cd client\nnpm start')

  console.log(chalk.green('Starting development server...'))
  
  child.stdout.on('data', data => console.log(chalk.green.bold('[EXPRESS] STDOUT:'), data) )
  child.stderr.on('data', data => console.log(chalk.yellow.bold('[EXPRESS] STDERR:'), data) )
  child_client.stdout.on('data', data => console.log(chalk.green.bold('[CLIENT] STDOUT:'), data) )
  child_client.stderr.on('data', data => console.log(chalk.yellow.bold('[CLIENT] STDERR:'), data) )

  child.on('close', code =>  console.log(chalk.grey.bold('[EXPRESS] CLOSING CODE:'), code) )
  child.on('close', code =>  console.log(chalk.grey.bold('[CLIENT] CLOSING CODE:'), code) )
}



module.exports = run