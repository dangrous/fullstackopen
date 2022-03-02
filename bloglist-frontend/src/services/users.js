import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const users = await axios.get(baseUrl)
  return users.data
}

const getOne = async (id) => {
  const response = await axios.get(baseUrl + `/${id}`)
  return response.data
}

const userService = {
  getAll,
  getOne,
}

export default userService
