'use strict'

/**
 * Module dependencies.
 */
import mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'
import UserDao from './dao'
import { autoIncrement } from 'mongoose-plugin-autoinc'

/**
 * Schema
 */
const UserSchema = new Schema(schema, options)

/**
 * Indexs
 */

/**
 * Plugins
 */
UserSchema.plugin(autoIncrement, {
  model: 'User',
  field: 'idInc',
  startAt: 1
})

UserSchema.plugin(UserDao)

export default mongoose.model('User', UserSchema)