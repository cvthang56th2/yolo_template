import customerRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(customerRoutes)
}

exports.name = 'customer'