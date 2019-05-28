import Axios from 'axios'

const save = data => Axios.post(`${process.env.apiUrl}/news`, data, {
  withCredentials: true
})

const getItems = data => Axios.get(`${process.env.apiUrl}/news`, {
  withCredentials: true
})

const getItem = data => Axios.get(`${process.env.apiUrl}/news/${data._id}`, data.params, {
  withCredentials: true
})

const remove = _id => Axios.delete(`${process.env.apiUrl}/news/${_id}`, {
  withCredentials: true
})

export default {
  save,
  getItems,
  getItem,
  remove
}
