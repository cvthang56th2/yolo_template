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
      _id: Joi.string().length(24).required().description('Room MongoId')
    }
  },
  save: {
    payload: {
      _id: Joi.string().length(24).description('Room MongoId'),
      name: Joi.string().description('name'),
      building: Joi.string().length(24).description('Building MongoId'),
      floor: Joi.number().description('floor'),
      peopleCapacity: Joi.number().description('peopleCapacity'),
      price: Joi.number().description('price'),
      description: Joi.string().description('description'),
      devices: Joi.array()
        .items(
          Joi.string().length(24)
        )
        .description('devices'),
      status: Joi.string().description('status')
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