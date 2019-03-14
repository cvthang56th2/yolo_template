import Joi from 'joi'

export default {
    getItems: {},
    getItem: {
        params: {
            _id: Joi.string().length(24).required().description('Room MongoId')
        }
    },
    save: {
        payload: {
            _id: Joi.string().length(24).description('Room MongoId'),
            name: Joi.string().description('Room name')
        },
        options: {
            allowUnknown: true
        }
    },
    remove: {
        params: {
            _id: Joi.string().length(24).required().description('Room MongoId')
        }
    },
    changeStatus: {
        params: {
            _id: Joi.string().length(24).required().description('Room MongoId')
        },
        payload: {
            status: Joi.string().regex(/^(active|archive)$/).description('status')
        }
    },
    upload: {
        params: {
            _id: Joi.string().length(24).required().description('Room MongoId')
        },
        payload: {
            file: Joi.any().meta({ swaggerType: 'file' }).description('file'),
        }
    },
}