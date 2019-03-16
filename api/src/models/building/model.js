'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import BuildingDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const BuildingSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
BuildingSchema.plugin(autoIncrement, {
  model: 'Building',
  field: 'idInc',
  startAt: 1
})

BuildingSchema.plugin(BuildingDao)

export default mongoose.model('Building', BuildingSchema)