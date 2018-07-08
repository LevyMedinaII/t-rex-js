const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
let addInquirer = require('./inquirer')

let add = async () => {
  try {
    let answers = await addInquirer()

    if (!fse.pathExistsSync(`./resources`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')
    
    if (!fse.pathExistsSync(`./client`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')

    fse.ensureDirSync(`./resources/${answers.resourceName}`)
    if (answers.enableSocket) {
      fse.copySync(
        `${__dirname}/../../templates/resources/sockets-resource/resource.js`,
        `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`)
      fse.copySync(
        `${__dirname}/../../templates/resources/sockets-resource/model.js`,
        `${process.cwd()}/resources/${answers.resourceName}/model.js`)  
      fse.copySync(
        `${__dirname}/../../templates/components/SocketsView.jsx`,
        `${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`)

      replaceString(
        `${process.cwd()}/resources/index.js`,
        /\/\/INSERTION/g,
        `{ location: require('./${answers.resourceName}/${answers.resourceName}')(IO), path: '/${answers.resourceName.toLowerCase()}'},\n\t\t//INSERTION`)
    } else {
      fse.copySync(`${__dirname}/../../templates/resources/regular-resource/resource.js`, `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`)
      fse.copySync(`${__dirname}/../../templates/resources/regular-resource/model.js`, `${process.cwd()}/resources/${answers.resourceName}/model.js`)  
      fse.copySync(`${__dirname}/../../templates/components/View.jsx`, `${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`)
      
      replaceString(
        `${process.cwd()}/resources/index.js`,
        /\/\/INSERTION/g,
        `{ location: require('./${answers.resourceName}/${answers.resourceName}'), path: '/${answers.resourceName.toLowerCase()}'},\n\t\t//INSERTION`)
    }
    
    replaceString(
      `${process.cwd()}/resources/${answers.resourceName}/${answers.resourceName}.js`,
      /{{resource_name}}/g,
      capitalize(answers.resourceName))
    replaceString(
      `${process.cwd()}/resources/${answers.resourceName}/model.js`,
      /{{resource_name}}/g,
      capitalize(answers.resourceName))
    replaceString(
      `${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`,
      /{{component_name}}/g,
      `${capitalize(answers.resourceName)}View`)
    replaceString(
      `${process.cwd()}/client/src/components/${capitalize(answers.resourceName)}View.jsx`,
      /{{resource_name}}/g,
      `${answers.resourceName}`)

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
  console.log(chalk.grey('Enable SocketsIO?'), answers.enableSocket)
  // console.log(chalk.grey('Resources:'), answers.createResource)
  console.log()
}

module.exports = add