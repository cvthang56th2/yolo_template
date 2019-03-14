/**
* File name: upload.js
* Created by Visual studio code
* User: Danh Le / danh.le@9thwonder.com
* Date: 2018-10-25 18:20:14
*/
import Joi from 'joi'

const config = global.CONFIG
const configPath = config.get('web.upload')

let allowDirectories = Object
  .keys(configPath)
  .reduce((result, key) => {
    let match = configPath[key].match(/files\/(.*)$/g)
    if (match) {
      let dir = ('/' + match.shift()).replace('/files/', '').split('/').shift()
      result.push(dir)
    }
    return result
  }, [])
  .filter((dir, index, arr) => arr.indexOf(dir) === index && !dir.match(/\.([a-zA-Z]*)$/))
  .join('|')

let folderRegex = new RegExp('^(' + allowDirectories + ')$')

const uploadValidate = {
  uploads: {
    payload: {
      // file: Joi.array().single(),
      // 'file[]': Joi.array().required().meta({ swaggerType: 'file' }).description('Files'),
      folder: Joi.string().regex(folderRegex).description('folder')
      // isThumb: Joi.any().description('isThumb'),
      // extension: Joi.string().description('Extension')
    },
    options: {
      allowUnknown: true
    }
  },
  upload: {
    payload: {
      file: Joi.any().required().meta({ swaggerType: 'file' }).description('File'),
      folder: Joi.string().regex(folderRegex).description('folder')
      // isThumb: Joi.any().description('isThumb'),
      // extension: Joi.string().description('Extension')
    },
    options: {
      allowUnknown: true
    }
  }
}

export default uploadValidate
