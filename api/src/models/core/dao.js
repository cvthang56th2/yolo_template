import mongoose from 'mongoose'

module.exports = function (schema, options) {
  schema.statics.saveItem = function (data) {
    if (!data._id || !mongoose.Types.ObjectId.isValid(data._id)) {
      delete data._id
      return this.create(data)
    } else {
      return this.findByIdAndUpdate(data._id, data, { new: true, runValidators: true })
    }
  }
}