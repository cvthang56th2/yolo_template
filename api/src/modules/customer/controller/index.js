import Boom from 'boom'
import mongoose from 'mongoose'

const Customer = mongoose.model('Customer')

const getItems = async (request, h) => {
  try {
    let { query } = request
    let dataInit = {
      page: query.page || 1,
      perPage: parseInt(query.perPage)
    }

    return Object.assign(await Customer.getPaginate(query, dataInit), await Customer.getCountByStatus(query))
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const getItem = async (request, h) => {
  try {
    let { params } = request
    if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
      return Boom.badRequest('Customer Id not valid.')
    }
    let item = await Customer.findById(params._id)
    if (!item) {
      return Boom.notFound('Customer not found.')
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
        return Boom.badRequest('Customer Id not valid.')
      }
      item = await Customer.findById(payload._id)
      if (!item) {
        return Boom.notFound('Customer not found.')
      }
      item = Object.assign(item, payload || {})
      await item.save()
    } else {
      item = await Customer.create(payload)
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
      return Boom.badRequest('Customer Id not valid.')
    }
    let item = await Customer.findById(params._id)
    if (!item) {
      return Boom.notFound('Customer not found.')
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
      return Boom.badRequest('Customer Id not valid.')
    }
    let item = await Customer.findById(params._id)
    if (!item) {
      return Boom.notFound('Customer not found.')
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