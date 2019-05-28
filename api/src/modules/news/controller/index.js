import Boom from 'boom'
import mongoose from 'mongoose'

const User = mongoose.model('User')

const getItems = async (request, h) => {
  try {
    let { query } = request
    let dataInit = {
      page: query.page || 1,
      perPage: parseInt(query.perPage)
    }

    return Object.assign(await User.getPaginate(query, dataInit), await User.getCountByStatus(query))
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const getItem = async (request, h) => {
  try {
    let { params } = request
    if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
      return Boom.badRequest('User Id not valid.')
    }
    let item = await User.findById(params._id)
    if (!item) {
      return Boom.notFound('User not found.')
    }
    return item
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const save = async (request, h) => {
  try {
    let { payload } = request
    let item
    if (payload._id) {
      if (!mongoose.Types.ObjectId.isValid(payload._id)) {
        return Boom.badRequest('User Id not valid.')
      }
      item = await User.findById(payload._id)
      if (!item) {
        return Boom.notFound('User not found.')
      }
      item = Object.assign(item, payload || {})
      await item.save()
    } else {
      item = await User.create(payload)
    }
    return item
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const remove = async (request, h) => {
  try {
    let { params } = request
    if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
      return Boom.badRequest('User Id not valid.')
    }
    let item = await User.findById(params._id)
    if (!item) {
      return Boom.notFound('User not found.')
    }
    await item.remove()
    return {
      success: true
    }
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const changeStatus = async (request, h) => {
  try {
    let { params } = request
    if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
      return Boom.badRequest('User Id not valid.')
    }
    let item = await User.findById(params._id)
    if (!item) {
      return Boom.notFound('User not found.')
    }
    item.status = request.payload.status
    await item.save()
    return item
  } catch (error) {
    return Boom.badRequest(error)
  }
}

export default {
  getItems,
  getItem,
  save,
  remove,
  changeStatus
}