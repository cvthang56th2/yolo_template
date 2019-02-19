'use strict'

const bluebird = require('bluebird')
const redis = require('redis')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

exports.register = async function (server, options) {
  let settings = global.CONFIG.get('web.redisOptions')
  let client = redis.createClient(settings)

  client.on('error', function (err) {
    console.log('REDIS Error ' + err)
  })

  server.events.on('stop', (route) => {
    // console.log("REDIS Stop ")
    client.end(true)
    client.quit()
  })

  client.on('ready', function () {
    console.log('REDIS READY ')
  })

  client.on('connect', function () {
    // console.log("REDIS Connect ")
  })

  server.decorate('server', 'redis', client)
  server.decorate('request', 'redis', client)
  server.expose('client', client)
}

exports.name = 'app-redis'
exports.dependencies = 'app-mongo'
