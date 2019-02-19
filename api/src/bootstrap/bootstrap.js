'use strict'

import HapiSwagger from 'hapi-swagger'
import Path from 'path'
import Glob from 'glob'

/* [Sercurity] CSRF crumb generation and validation for hapi */
// const Crumb = require('crumb')

/* [Sercurity] XSS */
// const Disinfect = require('../lib/disinfect')

const Pack = require(global.BASE_PATH + '/package')
global.COOKIE_NAME_WEB = Pack.name + '-token'

module.exports = async function (server) {
  await server.register([
    // {
    //   plugin: Crumb,
    //   options: {
    //     key: 'csrf',
    //     restful: true
    //   }
    // },
    {
      plugin: require('inert')
    },
    {
      plugin: require('vision')
    },
    {
      plugin: HapiSwagger,
      options: {
        host: global.CONFIG.get('web.swagger.host'),
        schemes: global.CONFIG.get('web.swagger.schemes'),
        info: {
          title: 'Documentation',
          version: Pack.version
        }
      }
    },
    // {
    //   plugin: require('../lib/redis.js')
    // },
    {
      plugin: require('../lib/mongo.js')
    },
    // {
    //   plugin: require('../lib/auth.js')
    // },
    // {
    //   plugin: require('../lib/static.js')
    // },
    // {
    //   plugin: require('../lib/hapi-kue/index.js')
    // },
    // {
    //   plugin: require('../lib/hapi-scheduler/index.js')
    // }
  ])
    .then(async (err) => {
      if (err) {
        server.log(['error', 'server'], err)
      }
      // autoload models
      let models = Glob.sync(global.BASE_PATH + '/src/models/*/model*.js', {})
      models.forEach((item) => {
        require(Path.resolve(item))
      })

      // autoload admin modules
      let modules = []
      let modulesName = Glob.sync(global.BASE_PATH + `/src/modules/*/index.js`, {})
      modulesName.forEach((item) => {
        modules.push(require(Path.resolve(`${item}`)))
      })

      if (modules.length) {
        let options = {}
        options.routes = { prefix: global.CONFIG.get('web.context.apiPrefix') }
        await server.register(modules, options, (err) => {
          if (err) {
            server.log(['error', 'server'], err)
          }
        })
      }
    })
}
