const express = require('express')
const api = require('./api')
const auth = require('./auth')

const server = express()
module.exports = server

const contextRoot = '/portal'
const apiPrefix = '/api/v1'
const commonRoot = '/Common'

server.use(logStart)
server.use(contextRoot + apiPrefix, fakeDelay)
server.use(logEnd)

server.use(contextRoot, auth)
server.use(contextRoot + apiPrefix, api)
server.use(contextRoot + apiPrefix + commonRoot, api)

function logStart(req, resp, next) {
  console.time(`${req.method} ${req.url}`)
  next()
}

function logEnd(req, resp, next) {
  console.timeEnd(`${req.method} ${req.url}`)
  next()
}

// function cors(req, resp, next) {
//   resp.header('Access-Control-Allow-Origin', '*')
//   resp.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   )
//   next()
// }

function fakeDelay(req, resp, next) {
  const delayMs = req.method === 'OPTIONS' ? 0 : Math.random() * 1000
  setTimeout(next, delayMs)
}
