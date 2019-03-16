import Boom from 'boom'
import path from 'path'
import { General as Helpers } from '@global/helpers'
// const resize = require('im-resize')
const configManager = global.CONFIG

const upload = async (request, h) => {
  /*
  if (Math.floor(Math.random() * 100) > 55) {
    return Boom.badRequest('Error')
  }
  */
  // console.log('request.server.plugins', request.server.plugins)
  let data = request.payload
  let uploadStream = data.file
  // console.log('uploaded: ', uploadStream)
  if (typeof uploadStream !== 'undefined' && uploadStream !== null && uploadStream.hapi) {
    let fileName = uploadStream.hapi.filename
    let uploadPath = path.resolve(configManager.get('web.upload.path'))
    // console.log('uploadPath', uploadPath)
    // console.log('fileName', fileName)
    let temp = Helpers.tempDay()
    let subFolder = data.folder || 'temp/' + temp
    subFolder = subFolder === 'temp' ? 'temp/' + temp : subFolder

    // subFolder = subFolder.split('/').pop()
    let uploadUtil = request.server.plugins['admin-core']
    // console.log('uploadUtil', uploadUtil)
    try {
      let fileInfo = await uploadUtil.upload(uploadStream, fileName, uploadPath, subFolder)
      /*
      if (data.isThumb) {
        let image = {
          path: uploadPath + '/' + subFolder + '/' + fileInfo.filename,
          width: fileInfo.width,
          height: fileInfo.height
        }

        let output = {
          versions: [{
            prefix: 'thumb-',
            maxWidth: 100,
            aspect: '1:1'
          }]
        }

        resize(image, output, function (error, versions) {
          if (error) {
            console.error(error)
          }
        })
      }
      */

      // Log
      request.Log.add({
        user: request.auth.credentials.uid,
        module: 'core',
        action: 'upload',
        type: 'create',
        object: {
          new: fileInfo,
          old: null
        },
        description: 'File ' + fileInfo.fileName + ' has been uploaded.'
      })

      delete fileInfo.filePath
      delete fileInfo.filename
      return {
        temp,
        fileName: fileInfo.fileName,
        fileUrl: fileInfo.fileUrl
      }
    } catch (err) {
      console.log('upload err', err)
      request.log(['error', 'upload'], err)
      return Boom.badRequest(err)
    }
  } else {
    // request.log(['error', 'upload'], null);
    return Boom.badRequest('No file to process.')
  }
}

// with file is array []
const uploads = async (request, h) => {
  /*
  if (Math.floor(Math.random() * 100) > 55) {
    return Boom.badRequest('Error')
  }
  */
  let arrFiles = []
  let subFolder = request.payload.folder || ''
  subFolder = subFolder.split('/').pop()
  let uploadUtil = request.server.plugins['admin-core']
  let fileName = ''
  let uploadPath = path.resolve(configManager.get('web.upload.path'))

  for (let uploadStream of request.payload.file) {
    // console.log('uploadStream', key, uploadStream)
    if (typeof uploadStream !== 'undefined' && uploadStream !== null && uploadStream.hapi) {
      fileName = uploadStream.hapi.filename
      // console.log('uploadPath', uploadPath)
      // console.log('fileName', fileName)
      // console.log('uploadUtil', uploadUtil)
      try {
        let fileInfo = await uploadUtil.upload(uploadStream, fileName, uploadPath, subFolder)
        /*
        if (data.isThumb) {
          let image = {
            path: uploadPath + '/' + subFolder + '/' + fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height
          }

          let output = {
            versions: [{
              prefix: 'thumb-',
              maxWidth: 100,
              aspect: '1:1'
            }]
          }

          resize(image, output, function (error, versions) {
            if (error) {
              console.error(error)
            }
          })
        }
        */

        // Log
        request.Log.add({
          user: request.auth.credentials.uid,
          module: 'core',
          action: 'uploads',
          type: 'create',
          object: {
            new: fileInfo,
            old: null
          },
          description: 'Upload file'
        })

        arrFiles.push(fileInfo.filename)
      } catch (err) {
        request.log(['error', 'upload'], err)
      }
    }
  }

  return arrFiles
}

// with file[] like file[0], file[1], file[2]
const uploadsOld = async (request, h) => {
  /*
  if (Math.floor(Math.random() * 100) > 55) {
    return reply(Boom.badRequest('Error'))
  }
  */
  let arrFiles = []
  let uploadStream = null
  let subFolder = request.payload.folder || ''
  subFolder = subFolder.split('/').pop()
  let uploadUtil = request.server.plugins['admin-core']
  let fileName = ''
  let uploadPath = path.resolve(configManager.get('web.upload.path'))

  for (let key in request.payload) {
    uploadStream = request.payload[key]
    // console.log('uploadStream', key, uploadStream)
    if (typeof uploadStream !== 'undefined' && uploadStream !== null && uploadStream.hapi) {
      fileName = uploadStream.hapi.filename
      // console.log('uploadPath', uploadPath)
      // console.log('fileName', fileName)
      // console.log('uploadUtil', uploadUtil)
      try {
        let fileInfo = await uploadUtil.upload(uploadStream, fileName, uploadPath, subFolder)
        /*
        if (data.isThumb) {
          let image = {
            path: uploadPath + '/' + subFolder + '/' + fileInfo.filename,
            width: fileInfo.width,
            height: fileInfo.height
          }

          let output = {
            versions: [{
              prefix: 'thumb-',
              maxWidth: 100,
              aspect: '1:1'
            }]
          }

          resize(image, output, function (error, versions) {
            if (error) {
              console.error(error)
            }
          })
        }
        */

        // Log
        request.Log.add({
          user: request.auth.credentials.uid,
          module: 'core',
          action: 'uploadsOld',
          type: 'create',
          object: {
            new: fileInfo,
            old: null
          },
          description: 'Upload file'
        })

        arrFiles.push(fileInfo.filename)
      } catch (err) {
        request.log(['error', 'upload'], err)
      }
    }
  }

  return arrFiles
}

export default {
  upload,
  uploads,
  uploadsOld
}