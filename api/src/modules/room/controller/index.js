import Boom from 'boom'
import mongoose from 'mongoose'
import File from '@utils/file'

const Room = mongoose.model('Room')
const config = global.CONFIG
const roomPath = config.get('web.upload.roomPath')
    // const roomPathThumb = config.get('web.upload.roomPathThumb')

const getItems = async(request, h) => {
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

const getItem = async(request, h) => {
    try {
        let { params } = request
        let room = await Room.findById(params._id)
        return room
    } catch (error) {
        return Boom.badRequest(error)
    }
}
const save = async(request, h) => {
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

const remove = async(request, h) => {
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

const changeStatus = async(request, h) => {
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

const upload = async(request, h) => {
    try {
        let { prams, payload } = request
        let { params } = request
        if (!(params._id && mongoose.Types.ObjectId.isValid(params._id))) {
            return Boom.badRequest('Room Id not valid.')
        }
        let room = await Room.findById(params._id)
        if (!room) {
            return Boom.notFound('Room not found.')
        }
        let fileUpload = payload.file
        console.log(fileUpload)
        if (typeof fileUpload !== 'undefined' && fileUpload !== null && fileUpload.hapi) {
            // Remove picture exists
            console.log(123123)
            if (room.image) {
                let { image } = room
                // let oldImagePath = path.join(roomPath, image)
                // let oldThumbPath = path.join(roomPathThumb, thumb)
                // let thumb300 = thumb.replace(/(\.[a-zA-Z0-9]*)$/g, '-300$1')
                // let oldThumb300Path = path.join(roomPathThumb, thumb300)

                if (image && oldImagePath && fs.existsSync(oldImagePath)) {
                    await File.delete(oldImagePath)
                }
                // if (thumb && oldThumbPath && fs.existsSync(oldThumbPath)) {
                // await File.delete(oldThumbPath)
                // await File.delete(oldThumb300Path)
                // }
            }

            // Upload logo
            let fileImageType = fileUpload.hapi.headers['content-type'].split('/').slice(1)
            let fileImageName = `room-${_id}-${new Date().getTime()}.${fileImageType}`
            let fileImageInfo = await request.server.plugins['admin-core'].upload(fileUpload, fileImageName, roomPath)
                // let filePath = path.join(roomPath, fileImageInfo.fileName)
            console.log(fileImageInfo)
                // let thumbName = `thumb-${fileImageInfo.fileName}`
                // let thumbPath = path.join(roomPathThumb, thumbName)
                // await Image.makeThumb(filePath, thumbPath)

            room.image = fileImageInfo.fileName
                // room.thumb = thumbName
        }
        console.log(room)
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
    changeStatus,
    upload
}