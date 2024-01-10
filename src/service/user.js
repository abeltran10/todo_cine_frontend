import axios from 'axios'
const baseUrl = '/app/usuario'


const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/username/${name}`, config)
    return response.then(response => response.data)  
}

const updateUsuario = async (id, user) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.put(`${baseUrl}/${id}`, user, config)
  return response.data  
}


export default { getByName, updateUsuario }