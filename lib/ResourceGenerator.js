require(`${__dirname}/Resource`)
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

class ResourceGenerator {
  static createResourcesFromFile(path) {
    let generator = require(path).resources
    let config = {}
    let resources = []

    for (const key in generator) {
      config.name = key
      config.methods = generator[key].methods
      config.attributes = generator[key].attributes
      config.isSocket = generator[key].isSocket

      resources.push(new Resource(config))
    }

    return resources
  }

  static writeResource(resource) {
    if (!fse.pathExistsSync(`./resources`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')
    if (!fse.pathExistsSync(`./client`))
      throw new Error('ERROR: Please run the command at the root folder of your project.')

    fse.ensureDirSync(`./resources/${resource.name}`)

    if (resource.isSocket) {
      /* == COPY FILES ==*/
      // resource.js
      // model.js
      // SocketsView.jsx
      fse.copySync(`${__dirname}/../templates/resources/sockets-resource/resource.js`, `${process.cwd()}/resources/${resource.name}/${resource.name}.js`)
      fse.copySync(`${__dirname}/../templates/resources/sockets-resource/model.js`, `${process.cwd()}/resources/${resource.name}/model.js`)  
      fse.copySync(`${__dirname}/../templates/components/SocketsView.jsx`, `${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`)

      // Incorporate to project
      replaceString(`${process.cwd()}/resources/index.js`, /\/\/INSERTION/g, `{ location: require('./${resource.name}/${resource.name}')(IO), path: '/${resource.name.toLowerCase()}'},\n\t\t//INSERTION`)
    } else {
      /* == COPY FILES ==*/
      // resource.js
      // model.js
      // View.jsx
      fse.copySync(`${__dirname}/../templates/resources/regular-resource/resource.js`, `${process.cwd()}/resources/${resource.name}/${resource.name}.js`)
      fse.copySync(`${__dirname}/../templates/resources/regular-resource/model.js`, `${process.cwd()}/resources/${resource.name}/model.js`)  
      fse.copySync(`${__dirname}/../templates/components/View.jsx`, `${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`)
      
      // Incorporate to project
      replaceString(`${process.cwd()}/resources/index.js`, /\/\/INSERTION/g, `{ location: require('./${resource.name}/${resource.name}'), path: '/${resource.name.toLowerCase()}'},\n\t\t//INSERTION`)
    }
    
    /* == EDIT COPIED FILES WITH USER'S ANSWERS == */
    // Edit resource file with given methods
    if (resource.methods.find('GET')) {
      
    }
    if (resource.methods.find('POST')) {
      
    }
    if (resource.methods.find('PUT')) {
      
    }
    if (resource.methods.find('DELETE')) {
      
    }


    // Edit files with given resource name
    replaceString(`${process.cwd()}/resources/${resource.name}/${resource.name}.js`, /{{resource_name}}/g, capitalize(resource.name))
    replaceString(`${process.cwd()}/resources/${resource.name}/model.js`, /{{resource_name}}/g, capitalize(resource.name))
    replaceString(`${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`, /{{component_name}}/g, `${capitalize(resource.name)}View`)
    replaceString(`${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`, /{{resource_name}}/g, `${resource.name}`)
  }
}