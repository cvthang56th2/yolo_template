/**
 * File name: upload.js
 * Created by Visual studio code
 * User: khoa.tran@carbon8.com
 * Date: 2018-07-17 09:14:15
 */
import Controller from '../controller/upload'
import Validate from '../validate/upload'
const config = global.CONFIG

export default [{
  method: 'POST',
  path: '/upload',
  handler: Controller.upload,
  options: {
    validate: Validate.upload,
    payload: {
      maxBytes: config.get('web.uploadMaxBytes'),
      parse: true,
      allow: 'multipart/form-data',
      output: 'stream'
    },
    description: 'Handle Upload File',
    tags: ['api'],
    plugins: {
      disinfect: false,
      'hapi-swagger': {
        responses: { '400': { 'description': 'Bad Request' } },
        payloadType: 'form'
      }
    }
  }
},
{
  method: 'POST',
  path: '/uploads',
  handler: Controller.uploads,
  options: {
    validate: Validate.uploads,
    payload: {
      maxBytes: config.get('web.uploadMaxBytes'),
      parse: true,
      allow: 'multipart/form-data',
      output: 'stream'
    },
    description: 'Handle Upload Files',
    tags: ['api'],
    plugins: {
      disinfect: false,
      'hapi-swagger': {
        responses: { '400': { 'description': 'Bad Request' } },
        payloadType: 'form'
      }
    }
  }
}
]