'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import DeviceDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const DeviceSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
DeviceSchema.plugin(autoIncrement, {
  model: 'Device',
  field: 'idInc',
  startAt: 1
})

DeviceSchema.plugin(DeviceDao)

export default mongoose.model('Device', DeviceSchema)