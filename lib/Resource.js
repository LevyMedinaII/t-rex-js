class Resource {
  constructor(config) {
    config.name ? this.name = config.name : this.name = ''
    config.methods ? this.methods = config.methods : this.methods = []
    config.attributes ? this.attributes = config.attributes : this.attributes = {}
    config.isSocket ? this.isSocket = config.isSocket : this.isSocket = false
  }

  get name() {
    return this.name
  }

  get methods() {
    return this.methods
  }

  get attributes() {
    let attributesJsonArray = []
    for (const key in this.attributes) {
      attributesJsonArray.push({
        name: key,
        type: this.attributes['key']
      })
    }
    return this.attributes
  }

  get isSocket() {
    return this.isSocket
  }

  set addMethod(method) {
    this.methods.push(method)
  }
  
  set attributes(name, value) {
    this.attributes['name'] = value
  }
}

module.exports = Resource