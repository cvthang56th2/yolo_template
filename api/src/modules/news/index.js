import userRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(userRoutes)
}

exports.name = 'user'