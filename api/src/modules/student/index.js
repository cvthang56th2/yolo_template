import studentRoutes from './route/index'

exports.register = (server, options) => {
    /* Register router */
    server.route(studentRoutes)
}

exports.name = 'student'