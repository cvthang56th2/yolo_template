'use strict'
import mongoosePaginate from 'mongoose-paginate'
import mongoose from 'mongoose'

const CoreDao = require(`${global.BASE_MODEL}/core/dao`)

exports.register = async function(server, options) {
    await mongoose.connect(global.CONFIG.get('web.db.uri'), { useNewUrlParser: true })
    mongoose.set('useCreateIndex', true)
    mongoose.plugin(mongoosePaginate)
    mongoose.plugin(CoreDao)
        // console.log('Register Mongo:', global.CONFIG.get('web.db.uri'))
}

exports.name = 'app-mongo'