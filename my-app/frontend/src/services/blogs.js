import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
      headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id, blogObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`http://localhost:3003/api/blogs/${id}`, blogObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`http://localhost:3003/api/blogs/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, like, remove }