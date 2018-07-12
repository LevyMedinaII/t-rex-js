const should = require('chai').should()
const expect = require('chai').expect
let Resource = require(`${__dirname}/../lib/Resource`)

let data = {
  name: 'users',
  methods: ['GET', 'DELETE'],
  attributes: { name: 'STRING', age: 'INTEGER' },
  isSocket: true,
}

describe('Class::Resource', () => {
  let resource;

  beforeEach(() => {
    resource = new Resource(data.name, data.methods, data.attributes, data.isSocket)
  })

  describe('GET name', () => {
    it('should return the name property of class Resource', () => {
      let expected = 'users'

      let result = resource.name

      expect((result).should.equal(expected))
    })
  })

  describe('GET methods', () => {
    it('should return the methods property of class Resource', () => {
      let expected = ['GET', 'DELETE']

      let result = resource.methods

      expect((result).should.deep.equal(expected))
    })
  })

  describe('GET attributes', () => {
    it('should return the attributes property of class Resource', () => {
      let expected = [{ name: 'name', type: 'STRING'}, { name: 'age', type: 'INTEGER' }]

      let result = resource.attributes

      expect((result).should.deep.equal(expected))
    })
  })

  describe('GET isSocket', () => {
    it('should return the isSocket property of class Resource', () => {
      let expected = true

      let result = resource.isSocket

      expect((result).should.equal(expected))
    })
  })
})