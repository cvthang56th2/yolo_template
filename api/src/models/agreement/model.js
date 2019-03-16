'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import AgreementDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const AgreementSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
AgreementSchema.plugin(autoIncrement, {
  model: 'Agreement',
  field: 'idInc',
  startAt: 1
})

AgreementSchema.plugin(AgreementDao)

export default mongoose.model('Agreement', AgreementSchema)