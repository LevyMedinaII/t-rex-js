const chalk = require('chalk')
const fse = require('fs-extra')
const path = require('path')
const appDir = path.dirname(require.main.filename)
let addInquirer = require('./inquirer')

/*
 * Add resource command
 *
 */
let add = async () => {
  try {
    let answers = await addInquirer()

    fse.ensureDir(`./resources/${answers.resourceName}`, err => { if (err) throw err })
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