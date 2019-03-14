import Joi from 'joi'

export default {
  getItem: {
  },
  save: {
    payload: {
      _id: Joi.string().length(24).description('Student MongoId'),
      name: Joi.string().description('Student name')
    },
    options: {
      allowUnknown: true
    }
  }
}
