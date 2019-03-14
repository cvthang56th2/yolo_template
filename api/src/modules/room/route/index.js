import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'

export default [{
    method: 'GET',
    path: '/rooms',
    options: {
        handler: Controller.getItems,
        validate: Validate.getItems,
        description: 'Get rooms',
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
    path: '/rooms/{_id}',
    options: {
        handler: Controller.getItem,
        validate: Validate.getItem,
        description: 'Get room item',
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
    path: '/rooms',
    options: {
        handler: Controller.save,
        validate: Validate.save,
        description: 'Save room',
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
    path: '/rooms/{_id}',
    options: {
        handler: Controller.remove,
        validate: Validate.remove,
        description: 'Remove room',
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
    path: '/rooms/{_id}/status',
    options: {
        handler: Controller.changeStatus,
        validate: Validate.changeStatus,
        description: 'Change status room',
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
    path: '/rooms/{_id}/upload',
    options: {
        handler: Controller.upload,
        validate: Validate.upload,
        description: 'upload room',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                responses: { '400': { 'description': 'Bad Request' } },
                payloadType: 'form'
            }
        }
    }
}]