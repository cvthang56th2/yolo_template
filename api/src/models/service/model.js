'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import ServiceDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const ServiceSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
ServiceSchema.plugin(autoIncrement, {
  model: 'Service',
  field: 'idInc',
  startAt: 1
})

ServiceSchema.plugin(ServiceDao)

export default mongoose.model('Service', ServiceSchema)