import paymentRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(paymentRoutes)
}

exports.name = 'payment'