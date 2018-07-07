const fse = require('fs-extra')

let capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('')
let replaceString = (file, target, value) => {
  try {
    let data = fse.readFileSync(file, 'utf8')
    let result = data.replace(target, value)
    fse.writeFileSync(file, result, 'utf8')
  } catch (err) {
    throw err
  }
}

class ResourceCreator {
  static addResource(config) {
    if (!fse.pathExistsSync(`./resources`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')
    
    if (!fse.pathExistsSync(`./client`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')

    fse.ensureDirSync(`./resources/${config.resourceName}`)
    if (config.enableSocket) {
      fse.copySync(
        `${__dirname}/../templates/resources/sockets-resource/resource.js`,
        `${process.cwd()}/resources/${config.resourceName}/${config.resourceName}.js`)
      fse.copySync(
        `${__dirname}/../templates/resources/sockets-resource/model.js`,
        `${process.cwd()}/resources/${config.resourceName}/model.js`)  
      fse.copySync(
        `${__dirname}/../templates/components/SocketsView.jsx`,
        `${process.cwd()}/client/src/components/${capitalize(config.resourceName)}View.jsx`)

      replaceString(
        `${process.cwd()}/resources/index.js`,
        /\/\/INSERTION/g,
        `{ location: require('./${config.resourceName}/${config.resourceName}')(IO), path: '/${config.resourceName.toLowerCase()}'},\n\t\t//INSERTION`)
    } else {
      fse.copySync(`${__dirname}/../templates/resources/regular-resource/resource.js`, `${process.cwd()}/resources/${config.resourceName}/${config.resourceName}.js`)
      fse.copySync(`${__dirname}/../templates/resources/regular-resource/model.js`, `${process.cwd()}/resources/${config.resourceName}/model.js`)  
      fse.copySync(`${__dirname}/../templates/components/View.jsx`, `${process.cwd()}/client/src/components/${capitalize(config.resourceName)}View.jsx`)
      
      replaceString(
        `${process.cwd()}/resources/index.js`,
        /\/\/INSERTION/g,
        `{ location: require('./${config.resourceName}/${config.resourceName}'), path: '/${config.resourceName.toLowerCase()}'},\n\t\t//INSERTION`)
    }
    
    replaceString(
      `${process.cwd()}/resources/${config.resourceName}/${config.resourceName}.js`,
      /{{resource_name}}/g,
      capitalize(config.resourceName))
    replaceString(
      `${process.cwd()}/resources/${config.resourceName}/model.js`,
      /{{resource_name}}/g,
      capitalize(config.resourceName))
    replaceString(
      `${process.cwd()}/client/src/components/${capitalize(config.resourceName)}View.jsx`,
      /{{component_name}}/g,
      `${capitalize(config.resourceName)}View`)
    replaceString(
      `${process.cwd()}/client/src/components/${capitalize(config.resourceName)}View.jsx`,
      /{{resource_name}}/g,
      `${config.resourceName}`)
  }
}

module.exports = ResourceCreator