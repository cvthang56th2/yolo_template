'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import NewsDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const NewsSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
NewsSchema.plugin(autoIncrement, {
  model: 'News',
  field: 'idInc',
  startAt: 1
})

NewsSchema.plugin(NewsDao)

export default mongoose.model('News', NewsSchema)