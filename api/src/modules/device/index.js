import deviceRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(deviceRoutes)
}

exports.name = 'device'