const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
let addInquirer = require('./inquirer')

/*
 * Add resource command
 *
 */
let add = async () => {
  try {
    let answers = await addInquirer()
    if (!fse.pathExistsSync(`./resources`)) throw new Error('ERROR: Please run the command at the root folder of your project.')
    fse.ensureDirSync(`./resources/${answers.resourceName}`)
    fse.copySync(
      `${__dirname}/../../templates/resources/sample-resource/sample-resource.js`,
      `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`
    )
    fse.copySync(
      `${__dirname}/../../templates/resources/sample-resource/model.js`,
      `${process.cwd()}/resources/${answers.resourceName}/model.js`
    )

    let files = [
      `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`,
      `${process.cwd()}/resources/${answers.resourceName}/model.js`
    ]
    
    files.map(file =>  replaceString(file, /Sample/g, capitalize(answers.resourceName)))
    replaceString(
      `${process.cwd()}/resources/index.js`,
      /\/\/INSERTION/g,
      `{ location: require('./${answers.resourceName}/${answers.resourceName}')(IO), path: '/${answers.resourceName.toLowerCase()}'}\n\t\t//INSERTION`
    )

    // Print Success
    console.log()
    console.log(chalk.bold.green('ADDED RESOURCE'))
    console.log(chalk.bold.green('------------------'))
    console.log(chalk.grey('Resource Name:'), answers.resourceName)
    console.log(chalk.grey('Add View?'), answers.createView)
    console.log(chalk.grey('Resources:'), answers.createResource)
    console.log()
  } catch (err) {
    console.log(chalk.red(err))
  }
}

/* == MISC Functions == */
let capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('')
let replaceString = async (file, target, value) => {
  try {
    let data = await fse.readFile(file, 'utf8')
    let result = data.replace(target, value)
    await fse.writeFile(file, result, 'utf8')
  } catch (err) {
    throw err
  }
}

module.exports = add