import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/devices',
    options: {
      handler: Controller.getItems,
      validate: Validate.getItems,
      description: 'Get devices',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  }, {
    method: 'GET',
    path: '/devices/{_id}',
    options: {
      handler: Controller.getItem,
      validate: Validate.getItem,
      description: 'Get device item',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  }, {
    method: 'POST',
    path: '/devices',
    options: {
      handler: Controller.save,
      validate: Validate.save,
      description: 'Save device',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/devices/{_id}',
    options: {
      handler: Controller.remove,
      validate: Validate.remove,
      description: 'Remove device',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  }, {
    method: 'POST',
    path: '/devices/{_id}/status',
    options: {
      handler: Controller.changeStatus,
      validate: Validate.changeStatus,
      description: 'Change status device',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  }
]