'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import PaymentDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const PaymentSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
PaymentSchema.plugin(autoIncrement, {
  model: 'Payment',
  field: 'idInc',
  startAt: 1
})

PaymentSchema.plugin(PaymentDao)

export default mongoose.model('Payment', PaymentSchema)