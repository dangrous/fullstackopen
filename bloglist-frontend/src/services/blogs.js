import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const blogPosts = await axios.get(baseUrl)
  return blogPosts.data
}

const create = async newObject => {  
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogObject, blogId) => {
  const response = await axios.put(baseUrl+"/"+blogId, blogObject)
  return response.data
}

const blogService = {
  getAll,
  create,
  setToken,
  update,
}

export default blogService