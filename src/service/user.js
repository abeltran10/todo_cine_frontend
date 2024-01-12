import axios from 'axios'
const baseUrl = '/app/usuario'


const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/username/${name}`, config)
    return response.then(response => response.data)  
}

const addFavsByUserId = async (id, movieId) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.post(`${baseUrl}/${id}/favs/${movieId}`, null, config)
  return response.data  
}

const removeFavsByUserId = async (id, movieId) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.delete(`${baseUrl}/${id}/favs/${movieId}`, config)
  return response.data  
}


export default { getByName, addFavsByUserId, removeFavsByUserId }