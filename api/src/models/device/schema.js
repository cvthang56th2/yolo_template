// import { Schema } from 'mongoose'

const schema = {
  name: String,
  price: Number,
  feeOfRefund: Number,
  unit: String, // enum: options.deviceUnits
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
  collection: 'devices',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }