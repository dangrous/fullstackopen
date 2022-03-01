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

const userService = {
  getAll,
}

export default userService
