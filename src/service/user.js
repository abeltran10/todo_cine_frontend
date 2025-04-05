import axios from 'axios'
const baseUrl = '/app/usuario'


const getUser = (id) => {
  const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }

  const response = axios.get(`${baseUrl}/${id}`, config)
  return response.then(response => response.data)  
}

const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/username/${name}`, config)
    return response.then(response => response.data)  
}



const createUser = async credentials => {
   const response = await axios.post(baseUrl, credentials)  
    return response.data
}

const updateUser = async user => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.put(`${baseUrl}/${user.id}`, user, config)  
  return response.data
}
 


export default { getUser, getByName, createUser, updateUser }