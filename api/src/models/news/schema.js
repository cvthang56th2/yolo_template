import { Schema } from 'mongoose'

const schema = {
  title: String,
  description: String,
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'archive']
  },
  createdAt: {
    type: Date,
    default: new Date
  }
}

const options = {
  collection: 'newss',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }