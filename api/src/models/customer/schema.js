import { Schema } from 'mongoose'

const schema = {
  name: String,
  phone: String,
  dob: Date,
  email: String,
  identify: {
    type: String,
    number: String,
    startDate: Date,
    place: String,
    image: {
      front: String,
      back: String
    }
  },
  job: String,
  placeOfWork: String,
  isStaying: Boolean,
  parent: {
    name: String,
    phone: String
  },
  avatar: String,
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
  collection: 'customers',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }