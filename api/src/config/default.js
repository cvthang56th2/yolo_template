'use strict'

let config = {}
const Pack = require(global.BASE_PATH + '/package')

config.web = {
    name: Pack.name,
    swagger: {
        host: 'localhost:9002',
        schemes: ['http']
    },
    db: {
        uri: 'mongodb://127.0.0.1:27017/db_test'
    },
    // redisOptions: {
    //   host: '127.0.0.1',
    //   port: 6379,
    //   detect_buffers: true
    // },
    upload: {
        path: process.cwd() + '/public/files',
        temp: process.cwd() + '/public/files/temp',
        roomPath: process.cwd() + '/public/files/room',
        roomPathThumb: process.cwd() + '/public/files/room/thumb'
    },
    uploadTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'docx', 'csv', 'pptx', 'xlsx', 'mp3', 'mp4', 'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gifv', 'mng', 'avi', 'mov', 'qt', 'wmv', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'svi', '3gp', '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b'],
    uploadMaxBytes: 104857600, // 100MB
    connection: {
        port: process.env.CMS_ADMIN_PORT || 9002,
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        routes: {
            cors: {
                origin: ['*'],
                credentials: true
            },
            // validate: {
            //   failAction: async (request, h, err) => {
            //     if (process.env.NODE_ENV === 'production') {
            //       // In prod, log a limited error message and throw the default Bad Request error.
            //       console.error('ValidationError:', err.message) // Better to use an actual logger here.
            //       throw Boom.badRequest(`Invalid request payload input`)
            //     } else {
            //       // During development, log and respond with the full error.
            //       console.error(err)
            //       throw err
            //     }
            //   }
            // }
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET_CMS || 'jKErFl345ghLoPrlafasTHdfgDsdf0werr'
    },
    error: {
        notfound: {
            url: '/error404' // 404 URL
        },
        user: {
            login: '/login' // Login URL
        }
    },
    context: {
        apiPrefix: '/api/v1',
        settings: {
            services: {
                url: 'http://localhost:9002'
            }
        }
    }
}

module.exports = config