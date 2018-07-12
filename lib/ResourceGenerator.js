const fse = require('fs-extra')
const Resource = require(`${__dirname}/Resource`)

require(`${__dirname}/common.js`)()

class ResourceGenerator {
  static createResourcesFromPath(path) {
    let generator = require(path).resources
    let resources = []

    for (const key in generator) {
      resources.push(new Resource(
        key,
        generator[key].methods,
        generator[key].attributes,
        generator[key].socket
      ))
    }

    return resources
  }

  static writeResource(resource) {
    // Prevent
    ResourceGenerator.runPreliminaryCheck(resource)

    // Create resource folderPlease run the command at the root folder of your project.
    createDirectoryWithDisplay(`${process.cwd()}/resources/${resource.name}`)

    if (resource.isSocket) {
      /* == COPY FILES ==*/
      // resource.js
      // model.js
      // SocketsView.jsx
      copyWithDisplay(`${__dirname}/../templates/resources/sockets-resource/resource.js`, `${process.cwd()}/resources/${resource.name}/${resource.name}.js`)
      copyWithDisplay(`${__dirname}/../templates/resources/sockets-resource/model.js`, `${process.cwd()}/resources/${resource.name}/model.js`)  
      copyWithDisplay(`${__dirname}/../templates/components/SocketsView.jsx`, `${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`)

      // Incorporate to project
      replaceString(`${process.cwd()}/resources/index.js`, /\/\/INSERTION/g, `{ location: require('./${resource.name}/${resource.name}')(IO), path: '/${resource.name.toLowerCase()}'},\n\t\t//INSERTION`)
    } else {
      /* == COPY FILES ==*/
      // resource.js
      // model.js
      // View.jsx
      copyWithDisplay(`${__dirname}/../templates/resources/regular-resource/resource.js`, `${process.cwd()}/resources/${resource.name}/${resource.name}.js`)
      copyWithDisplay(`${__dirname}/../templates/resources/regular-resource/model.js`, `${process.cwd()}/resources/${resource.name}/model.js`)  
      copyWithDisplay(`${__dirname}/../templates/components/View.jsx`, `${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`)
      
      // Incorporate to project
      replaceString(`${process.cwd()}/resources/index.js`, /\/\/INSERTION/g, `{ location: require('./${resource.name}/${resource.name}'), path: '/${resource.name.toLowerCase()}'},\n\t\t//INSERTION`)
    }

    // Edit files with chosen resources
    ResourceGenerator.insertSelectedResourceMethods(resource)

    // Edit files with given attributes
    ResourceGenerator.insertAttributes(resource)

    // Edit files with given resource name
    replaceString(`${process.cwd()}/resources/${resource.name}/${resource.name}.js`, /\{\{resource_name\}\}/g, capitalize(resource.name))
    replaceString(`${process.cwd()}/resources/${resource.name}/model.js`, /\{\{resource_name\}\}/g, capitalize(resource.name))
    replaceString(`${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`, /\{\{component_name\}\}/g, `${capitalize(resource.name)}View`)
    replaceString(`${process.cwd()}/client/src/components/${capitalize(resource.name)}View.jsx`, /\{\{resource_name\}\}/g, `${resource.name}`)
  }

  /* == MISC METHODS == */
  static runPreliminaryCheck(resource) {
    if (!fse.pathExistsSync(`${process.cwd()}/resources`))
      throw 'Please run the command at the root folder of your project.'
    if (!fse.pathExistsSync(`${process.cwd()}/client`))
      throw 'Please run the command at the root folder of your project.'
    if (!fse.existsSync(`${process.cwd()}/package.json`))
      throw 'Please run the command at the root folder of your project.'
    if (fse.pathExistsSync(`${process.cwd()}/resources/${resource.name}`))
      throw 'Resource already exists'
  }

  static insertSelectedResourceMethods(resource) {
    /* == EDIT COPIED FILES WITH USER'S ANSWERS == */
    // Edit resource file with given methods
    let target = `${process.cwd()}/resources/${resource.name}/${resource.name}.js`
    let regex = null
    let replacement = null
    
    if (resource.methods.includes('GET')) {
      regex = /\{\{GET\}\}/
      replacement = fse.readFileSync(`${__dirname}/../templates/strings/methods/GET`)
      replaceString(target, regex, replacement)
    } 
    if (resource.methods.includes('POST')) {
      regex = /\{\{POST\}\}/g
      replacement = fse.readFileSync(`${__dirname}/../templates/strings/methods/POST`)
      replaceString(target, regex, replacement)
    }
    if (resource.methods.includes('PUT')) {
      regex = /\{\{PUT\}\}/g
      replacement = fse.readFileSync(`${__dirname}/../templates/strings/methods/PUT`)
      replaceString(target, regex, replacement)
    }
    if (resource.methods.includes('DELETE')) {
      regex = /\{\{DELETE\}\}/g
      replacement = fse.readFileSync(`${__dirname}/../templates/strings/methods/DELETE`)
      replaceString(target, regex, replacement)
    }
    
    // Remove handlebars from file
    replaceString(target, /\{\{((GET)|(POST)|(PUT)|(DELETE))\}\}/g, '')
  }

  static insertAttributes(resource) {
    const resourceTarget = `${process.cwd()}/resources/${resource.name}/${resource.name}.js`
    const modelTarget = `${process.cwd()}/resources/${resource.name}/model.js`
    let resourceReplacement = '{'
    let modelReplacement = '{'

    resource.attributes.map((attribute, i) => {
      resourceReplacement += `\n\t\t"${attribute.name}": req.body.${attribute.name},`
      modelReplacement += `\n\t"${attribute.name}": Sequelize.${attribute.type},`
    })

    resourceReplacement += '\n\t\t}'
    modelReplacement += '\n\t}'

    replaceString(resourceTarget, /\{\{attributes\}\}/g, resourceReplacement)
    replaceString(modelTarget, /\{\{model_attributes\}\}/g, modelReplacement)
  }
  /* == MISC METHODS END == */
}

module.exports = ResourceGenerator