import axios from 'axios'
// relative url since frontend and backend at same url
const baseUrl = 'api/notes'

// private variable with public setter
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken
}