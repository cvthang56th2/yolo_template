import serviceRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(serviceRoutes)
}

exports.name = 'service'