import Boom from 'boom'
import mongoose from 'mongoose'

const Student = mongoose.model('Student')
const getItem = async (request, h) => {
  try {
    return await Student.find({})
  } catch (err) {
    return Boom.badRequest(err)
  }
}
const save = async (request, h) => {
  try {
    let {payload} = request
    let student
    if (payload._id && mongoose.Types.ObjectId(payload._id)) {
      student = await Student.findById(payload._id)
      student.name = payload.name
      await student.save()
    } else {
      student = await Student.create(payload)
    }
    return student
  } catch (error) {
    return Boom.badRequest(error)
  }
}

export default {
  getItem,
  save
}