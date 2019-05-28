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
      _id: Joi.string().length(24).required().description('News MongoId')
    }
  },
  save: {
    payload: {
      _id: Joi.string().length(24).description('News MongoId'),
      name: Joi.string().description('name'),
      status: Joi.string().description('status')
    },
    options: {
      allowUnknown: true
    }
  },
  remove: {
    params: {
      _id: Joi.string().length(24).required().description('News MongoId')
    }
  },
  changeStatus: {
    params: {
      _id: Joi.string().length(24).required().description('News MongoId')
    },
    payload: {
      status: Joi.string().regex(/^(active|archive)$/).description('status')
    }
  },
  upload: {
    params: {
      _id: Joi.string().length(24).required().description('News MongoId')
    },
    payload: {
      file: Joi.any().meta({ swaggerType: 'file' }).description('file'),
    }
  },
}