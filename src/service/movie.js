import axios from 'axios'

const baseUrl = '/app/movie'
    
const getAll = () => {
  const response = axios.get(baseUrl)
  
  return response.then(response => response.data)
}

const getByName = async (name, page) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response =  await axios.get(`${baseUrl}/${name}?page=${page}`, config)
    return response.data
    
}

const create = async newObject => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
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
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, getByName, create, update, remove }