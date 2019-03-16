import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/buildings',
    options: {
      handler: Controller.getItems,
      validate: Validate.getItems,
      description: 'Get buildings',
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
    path: '/buildings/{_id}',
    options: {
      handler: Controller.getItem,
      validate: Validate.getItem,
      description: 'Get building item',
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
    path: '/buildings',
    options: {
      handler: Controller.save,
      validate: Validate.save,
      description: 'Save building',
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
    path: '/buildings/{_id}',
    options: {
      handler: Controller.remove,
      validate: Validate.remove,
      description: 'Remove building',
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
    path: '/buildings/{_id}/status',
    options: {
      handler: Controller.changeStatus,
      validate: Validate.changeStatus,
      description: 'Change status building',
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