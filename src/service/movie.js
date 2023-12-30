import axios from 'axios'

const baseUrl = '/app/movie'

let token = ''

const setToken = newToken => {
  token = newToken
}
    
const getAll = () => {
  const response = axios.get(baseUrl)
  
  return response.then(response => response.data)
}

const getByName = async (name) => {
    console.log(token)
    const config = {
        headers: { Authorization: token }
      }

    const response = await axios.get(`${baseUrl}/${name}`, config)

    return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, getByName, create, update, remove }