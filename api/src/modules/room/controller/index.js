import Boom from 'boom'
import mongoose from 'mongoose'
import File from '@utils/file'

const Room = mongoose.model('Room')
const config = global.CONFIG
const roomPath = config.get('web.upload.roomPath')
// const roomPathThumb = config.get('web.upload.roomPathThumb')

const getItems = async (request, h) => {
  try {
    let { query } = request
    let dataInit = {
      page: query.page || 1,
      perPage: parseInt(query.perPage)
    }

    return Object.assign(await Room.getPaginate(query, dataInit), await Room.getCountByStatus(query))
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const getItem = async (request, h) => {
  try {
    let { params } = request
    let room = await Room.findById(params._id)
    return room
  } catch (error) {
    return Boom.badRequest(error)
  }
}
const save = async (request, h) => {
  try {
    let { payload } = request
    let room
    if (payload._id && mongoose.Types.ObjectId.isValid(payload._id)) {
      room = await Room.findById(payload._id)
      if (!room) {
        return Boom.notFound('Room not found.')
      }
      room = Object.assign(room, payload || {})
      await room.save()
    } else {
      room = await Room.create(payload)
    }
    return room
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const remove = async (request, h) => {
  try {
    let { params } = request
    if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
      return Boom.badRequest('Room Id not valid.')
    }
    let room = await Room.findById(params._id)
    if (!room) {
      return Boom.notFound('Room not found.')
    }
    await room.remove()
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
      return Boom.badRequest('Room Id not valid.')
    }
    let room = await Room.findById(params._id)
    if (!room) {
      return Boom.notFound('Room not found.')
    }
    room.status = request.payload.status
    await room.save()
    return room
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