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

    /* == CREATE BACKEND RESOURCE == */
    if (!fse.pathExistsSync(`./resources`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')

    // Create resource files
    fse.ensureDirSync(`./resources/${answers.resourceName}`)
    fse.copySync(`${__dirname}/../../templates/resources/sample-resource/sample-resource.js`, `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`)
    fse.copySync(`${__dirname}/../../templates/resources/sample-resource/model.js`, `${process.cwd()}/resources/${answers.resourceName}/model.js`)
    fse.copySync(`${__dirname}/../../templates/components/View.jsx`, `${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`)
    
    // Rewrite object names to match resource name and incorporate
    replaceString(`${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`)
    replaceString(`${process.cwd()}/resources/${answers.resourceName}/model.js`)
    replaceString(`${process.cwd()}/resources/index.js`, /\/\/INSERTION/g, `{ location: require('./${answers.resourceName}/${answers.resourceName}')(IO), path: '/${answers.resourceName.toLowerCase()}'}\n\t\t//INSERTION`)
    replaceString(`${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`, /{{component_name}}/g, `${capitalize(answers.resourceName)}View`)
    replaceString(`${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`, /{{resource}}/g, `${answers.resourceName}`)

    /*== CREATE FRONTEND FOR RESOURCE ==*/
    if (!fse.pathExistsSync(`./client`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')

    // Print results
    printSuccessMessage(answers)
  } catch (err) {
    console.log(chalk.red(err))
  }
}

/* == MISC Functions == */
let capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('')
let printSuccessMessage = (answers) => {
  console.log()
  console.log(chalk.bold.green('ADDED RESOURCE'))
  console.log(chalk.bold.green('------------------'))
  console.log(chalk.grey('Resource Name:'), answers.resourceName)
  console.log(chalk.grey('Add View?'), answers.createView)
  console.log(chalk.grey('Resources:'), answers.createResource)
  console.log()
}
let replaceString = (file, target, value) => {
  try {
    let data = fse.readFileSync(file, 'utf8')
    let result = data.replace(target, value)
    fse.writeFileSync(file, result, 'utf8')
  } catch (err) {
    throw err
  }
}

module.exports = add