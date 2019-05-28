import newsRoutes from './route/index'

exports.register = (server, options) => {
  /* Register router */
  server.route(newsRoutes)
}

exports.name = 'news'