import { Schema } from 'mongoose'

const schema = {
  type: String, // enum: ['rent', 'deposit']
  room: {
    item: {
      type: Schema.ObjectId,
      ref: 'Room'
    },
    services: [{
      type: Schema.ObjectId,
      ref: 'Service'
    }]
  },
  customer: {
    type: Schema.ObjectId,
    ref: 'Customer'
  },
  represent: {
    type: Schema.ObjectId,
    ref: 'Customer'
  },
  duration: Number, //Thời hạn hợp đồng, đơn vị tháng
  periodOfTransaction: Number, //Kì thanh toán, đơn vị tháng/lần
  startDate: Date,
  endDate: Date,
  note: String,
  deposit: {
    money: Number,
    depositDate: Date,
    endTime: Date //ngày hết hạn đặt cọc
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
  collection: 'agreements',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }