import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/payments',
    options: {
      handler: Controller.getItems,
      validate: Validate.getItems,
      description: 'Get payments',
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
    path: '/payments/{_id}',
    options: {
      handler: Controller.getItem,
      validate: Validate.getItem,
      description: 'Get payment item',
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
    path: '/payments',
    options: {
      handler: Controller.save,
      validate: Validate.save,
      description: 'Save payment',
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
    path: '/payments/{_id}',
    options: {
      handler: Controller.remove,
      validate: Validate.remove,
      description: 'Remove payment',
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
    path: '/payments/{_id}/status',
    options: {
      handler: Controller.changeStatus,
      validate: Validate.changeStatus,
      description: 'Change status payment',
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