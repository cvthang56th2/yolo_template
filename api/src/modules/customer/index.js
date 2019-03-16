import buildingRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(buildingRoutes)
}

exports.name = 'building'