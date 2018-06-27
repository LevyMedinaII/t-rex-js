const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')

/*
 * Add resource command
 *
 */
let install = () => {
  const { exec } = require( 'child_process' )
  const child = exec('npm install\ncd client\nnpm install')

  console.log(chalk.green('Installing project dependencies...'))
  
  // Misc function for twirling in console
  let twirlTimer = (() => {
    let P = ["\\", "|", "/", "-"]
    let x = 0
    return setInterval(() => {
      process.stdout.write("\r" + P[x++])
      x &= 3
    }, 250)
  })()
  
  child.stdout.on('data', data => console.log(chalk.green.bold('STDOUT:'), data) )
  child.stderr.on('data', data => console.log(chalk.yellow.bold('STDERR:'), data) )

  child.on('close', code => {
    console.log(chalk.grey.bold('CLOSING CODE:'), code)
    clearInterval(twirlTimer)
  })
}



module.exports = install