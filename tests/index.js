process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/server.js')
const should = chai.should()

chai.use(chaiHttp)
server()


