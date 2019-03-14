'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import RoomDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const RoomSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
RoomSchema.plugin(autoIncrement, {
    model: 'Room',
    field: 'idInc',
    startAt: 1
})

RoomSchema.plugin(RoomDao)

export default mongoose.model('Room', RoomSchema)