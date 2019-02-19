import _ from 'lodash'
import Controller from '../controller/index'
import Validate from '../validate/index'
// const config = global.CONFIG

const optionsDefault = {
  description: '',
  tags: ['api', 'student'],
  plugins: {
    'hapi-swagger': {
      responses: { '400': { 'description': 'Bad Request' } },
      payloadType: 'form'
    }
  }
}
const getOptions = options => _.merge({}, optionsDefault, options)

export default [{
    method: 'GET',
    path: '/student',
    handler: Controller.getItem,
    options: getOptions({
      description: 'Get student item',
      validate: Validate.getItem
    })
  }, {
    method: 'GET',
    path: '/save-student',
    handler: Controller.save
  }
]