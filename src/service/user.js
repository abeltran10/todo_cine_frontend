import axios from 'axios'
const baseUrl = '/app/usuario'


const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/username/${name}`, config)
    return response.then(response => response.data)  
}

const getUserFavs = async (id, pagina) => {
  const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }

  const response =  await axios.get(`${baseUrl}/${id}/favs?page=${pagina}`, config)
  return response.data
}

const addFavsByUserId = async (id, movie) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.put(`${baseUrl}/${id}/favs`, movie, config)
  return response.data  
}

const removeFavsByUserId = async (id, movieId) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response = await axios.delete(`${baseUrl}/${id}/favs/${movieId}`, config)
  return response.data  
}


export default { getByName, getUserFavs, addFavsByUserId, removeFavsByUserId }