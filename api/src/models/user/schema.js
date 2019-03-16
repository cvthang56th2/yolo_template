import { Schema } from 'mongoose'

const schema = {
  userName: String,
  fullName: String,
  permisson: String, // find solution for permisson
  phone: String,
  gender: String, //enum: ['male', 'female', 'other']
  email: String,
  password: String, //warning this
  note: String,
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
  collection: 'users',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }