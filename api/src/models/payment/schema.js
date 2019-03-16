import { Schema } from 'mongoose'

const schema = {
  name: String,
  type: String, // enum: chi trả hàng tháng, chi phí sửa chữa, mua sắm mới, khác
  description: String,
  paymentDate: Date,
  quantity: Number,
  unit: String, //enum: optionUnit
  price: Number,
  paymentMoney: Number,
  description: String,
  createdAt: {
    type: Date,
    default: new Date
  }
}

const options = {
  collection: 'payments',
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
}

export { schema, options }