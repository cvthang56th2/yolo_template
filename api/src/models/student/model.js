'use strict'

/**
* Module dependencies.
*/
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import StudentDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
* Schema
*/
const StudentSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
StudentSchema.plugin(autoIncrement, {
  model: 'Student',
  field: 'idInc',
  startAt: 1
})

StudentSchema.plugin(StudentDao)

// StudentSchema.virtual('peoplesInfo', {
//   ref: 'People',
//   localField: 'talents.people',
//   foreignField: '_id'
// })

export default mongoose.model('Student', StudentSchema)
