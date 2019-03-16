import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/users',
    options: {
      handler: Controller.getItems,
      validate: Validate.getItems,
      description: 'Get users',
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
    path: '/users/{_id}',
    options: {
      handler: Controller.getItem,
      validate: Validate.getItem,
      description: 'Get user item',
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
    path: '/users',
    options: {
      handler: Controller.save,
      validate: Validate.save,
      description: 'Save user',
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
    path: '/users/{_id}',
    options: {
      handler: Controller.remove,
      validate: Validate.remove,
      description: 'Remove user',
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
    path: '/users/{_id}/status',
    options: {
      handler: Controller.changeStatus,
      validate: Validate.changeStatus,
      description: 'Change status user',
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