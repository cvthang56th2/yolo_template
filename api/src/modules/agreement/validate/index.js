import Joi from 'joi'

export default {
  getItems: {
    query: {},
    options: {
      allowUnknown: true
    }
  },
  getItem: {
    params: {
      _id: Joi.string().length(24).required().description('Building MongoId')
    }
  },
  save: {
    payload: {
      _id: Joi.string().length(24).description('Building MongoId'),
      name: Joi.string().description('name'),
      status: Joi.string().description('status')
    },
    options: {
      allowUnknown: true
    }
  },
  remove: {
    params: {
      _id: Joi.string().length(24).required().description('Building MongoId')
    }
  },
  changeStatus: {
    params: {
      _id: Joi.string().length(24).required().description('Building MongoId')
    },
    payload: {
      status: Joi.string().regex(/^(active|archive)$/).description('status')
    }
  },
  upload: {
    params: {
      _id: Joi.string().length(24).required().description('Building MongoId')
    },
    payload: {
      file: Joi.any().meta({ swaggerType: 'file' }).description('file'),
    }
  },
}