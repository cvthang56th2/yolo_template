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
    let {query} = request
    let student
    if (query._id && mongoose.Types.ObjectId(query._id)) {
      student = await Student.findById(query._id)
      student.name = query.name
      await student.save()
    } else {
      student = await Student.create(query)
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