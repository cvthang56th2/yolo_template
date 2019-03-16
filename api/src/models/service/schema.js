import { Schema } from 'mongoose'

const schema = {
  name: String,
  description: String,
  price: Number,
  unit: String,
  ruleOfFee: String, // maybe other
  isDefault: Boolean,
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
  collection: 'services',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }