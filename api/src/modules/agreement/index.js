import agreementRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(agreementRoutes)
}

exports.name = 'agreement'