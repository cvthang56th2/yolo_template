import uploadRoutes from './route/upload.js'

exports.register = async (server, options) => {
  let upload = require(global.BASE_UTIL + 'upload')(server)

  server.expose(upload)

  /* Register router */
  server.route(uploadRoutes)
}

exports.name = 'admin-core'