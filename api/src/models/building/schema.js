import { Schema } from 'mongoose'

const schema = {
  name: String,
  name: String,
  address: String,
  description: String,
  services: [{
    type: Schema.ObjectId,
    ref: 'Service'
  }],
  devices: [{
    type: Schema.ObjectId,
    ref: 'Device'
  }],
  alert: {
    electricAndWater: {
      from: Number, // > 0 < 31
      to: Number // > 0 < 31
    },
    exportBill: {
      from: Number, // > 0 < 31
      to: Number // > 0 < 31
    },
    feeDate: {
      from: Number, // > 0 < 31
      to: Number // > 0 < 31
    },
    contractExpireAt: Date
  },
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
  collection: 'buildings',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }