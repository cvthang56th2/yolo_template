'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import CustomerDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const CustomerSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
CustomerSchema.plugin(autoIncrement, {
  model: 'Customer',
  field: 'idInc',
  startAt: 1
})

CustomerSchema.plugin(CustomerDao)

export default mongoose.model('Customer', CustomerSchema)