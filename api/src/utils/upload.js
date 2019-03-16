/**
 * File name: upload.js
 * Created by Visual studio code
 * User: khoa.tran@carbon8.com
 * Date: 2018-07-17 09:35:01
 */
// import Image from './image'
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const mkdirp = Promise.promisifyAll(require('mkdirp'))
Promise.promisifyAll(fs)

// get file extension
const getFileExt = function (fileName) {
  let fileExt = fileName.split('.')
  if (fileExt.length === 1 || (fileExt[0] === '' && fileExt.length === 2)) {
    return ''
  }
  return fileExt.pop()
}

// get file upload name - without extension
const getFileName = function (fileName) {
  return fileName
    .substring(0, fileName.lastIndexOf('.'))
    .replace(/[^\w\s]| /gm, '-') // replace special character and <space> to '-'
}

/*
const fileValidate = function (fileName, allowExts, cb) {
  allowExts = allowExts.split(',')
  allowExts = allowExts.map(function (item) {
    return item.trim()
  })
  let fileExt = getFileExt(fileName).toLowerCase()
  if (allowExts.indexOf(fileExt) > -1) {
    cb(null, true)
  }
  cb(null, false)
}
*/

const preUpload = function (fileName, uploadPath, callback) {
  // make folder
  mkdirp
    .mkdirpAsync(uploadPath)
    .then(() => {
      return fs.accessAsync(path.join(uploadPath), fs.constants.R_OK)
    })
    .then(() => {
      fileName = getFileName(fileName) + '-' + Date.now() + '.' + getFileExt(fileName)
    })
    .catch(err => {
      callback(err)
    })
    .finally(() => {
      callback(null, fileName)
    })
}

const writeFile = function (readableStreamFile, fileName, uploadPath) {
  return new Promise(function (resolve, reject) {
    let dest = path.join(uploadPath, fileName)
    let writeStream = fs.createWriteStream(dest)
    writeStream.on('error', reject)
    readableStreamFile.pipe(writeStream)
    readableStreamFile.on('end', function () {
      let fileInfo = { filename: fileName }
      writeStream.close(() => {
        return resolve(fileInfo)
      })
    })
  })
}

const upload = (uploadStream, fileName, uploadPath, subFolder) => {
  /* Validate type file supported */
  let _allowTypes = global.CONFIG.get('web.uploadTypes')
  let regex = new RegExp('.(' + _allowTypes.join('|') + ')$', 'gmi')
  if (!fileName.match(regex)) {
    throw new Error('Not supported file types')
  }

  // add subfolder to upload path
  if (subFolder) {
    uploadPath = path.join(uploadPath, subFolder)
  }

  return new Promise(function (resolve, reject) {
    preUpload(fileName, uploadPath, function (err, fileName) {
      if (err) {
        console.log('preUpload Error: ', err)
        return reject(err)
      }

      writeFile(uploadStream, fileName, uploadPath)
        .then(async () => {
          let filePath = path.join(uploadPath, fileName)
          let match = filePath.replace(/\\/g, `/`).match(new RegExp(`(/files).*(${fileName})$`, 'g'))
          let fileUrl = match ? match[0] : ''
          if (fileName.match(/\.(jpeg|jpg|png|gif|bmp)$/gmi)) {
            // await Image.validImageSize(filePath)

            try {
              // await Image.fixOrientation(filePath)
            } catch (error) {
              console.log('Image.fixOrientation: ', error)
            }
          }

          resolve({
            filename: fileName,
            fileName,
            filePath,
            fileUrl
          })
        })
        .catch(err => {
          console.log('writeFile error: ', err)
          reject(err)
        })
    })
  })
}

const deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, err => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    } else {
      resolve()
    }
  })
}

module.exports = () => ({ upload, deleteFile })