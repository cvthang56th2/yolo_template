import roomRoutes from './route/index'

exports.register = (server, options) => {
    /* Register router */
    server.route(roomRoutes)
}

exports.name = 'room'