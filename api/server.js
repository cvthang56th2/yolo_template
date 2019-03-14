'use strict'
var bableOptions = {}
require('babel-core').transform('code', bableOptions);
require('module-alias/register')

const Path = require('path')
const Hapi = require('hapi')
const _ = require('lodash')

global.BASE_PATH = __dirname
global.STATIC_PATH = Path.join(__dirname, '/public/static/')
global.PUBLIC_PATH = Path.join(__dirname, '/public/files/')
global.BASE_MODEL = Path.join(__dirname, '/src/models/')
global.BASE_UTIL = Path.join(__dirname, '/src/utils/')

process.env.NODE_CONFIG_DIR = Path.join(__dirname, '/src/config')

global.CONFIG = require('config')
var options = _.cloneDeep(global.CONFIG.get('web.connection'))

const server = Hapi.server(options)

const init = async() => {
    await require('./src/bootstrap/bootstrap.js')(server)
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()