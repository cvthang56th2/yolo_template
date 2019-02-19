// import { Schema } from 'mongoose'

const schema = {
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date
  }
}

const options = {
  collection: 'students',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }
