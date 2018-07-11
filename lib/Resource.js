class Resource {
  constructor(name, methods = [], attributes = {}, isSocket = false) {
    this.resourceName = name
    this.resourceMethods = methods
    this.resourceAttributes = attributes
    this.usesSocket = isSocket
  }

  get name() {
    return this.resourceName
  }

  get methods() {
    return this.resourceMethods
  }

  get attributes() {
    let attributesJsonArray = []
    for (const key in this.resourceAttributes) {
      attributesJsonArray.push({
        name: key,
        type: this.resourceAttributes[key]
      })
    }
    return attributesJsonArray
  }

  get isSocket() {
    return this.usesSocket
  }

  set name(name) {
    this.resourceName = name
  }

  set methods(methods) {
    this.resourceMethods = methods
  }

  set addMethod(method) {
    this.resourceMethods.push(method)
  }

  set attributes(attributes) {
    this.resourceAttributes = attributes
  }

  set isSocket(bool) {
    this.usesSocket = bool
  }
}

module.exports = Resource