import { Schema } from 'mongoose'

const schema = {
  name: String,
  building: {
    type: Schema.ObjectId,
    ref: 'Building'
  },
  floor: Number,
  peopleCapacity: Number,
  price: Number,
  description: String,
  devices: [{
    type: Schema.ObjectId,
    ref: 'Device'
  }],
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
  collection: 'rooms',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }