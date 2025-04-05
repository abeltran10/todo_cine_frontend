import axios from 'axios'
const baseUrl = '/app/favoritos'

const getUserFavs = async (pagina) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }
  
    const response =  await axios.get(`${baseUrl}?page=${pagina}`, config)
    return response.data
  }
  
  const addFavs = async (movie) => {
    const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }
  
    const response = await axios.post(`${baseUrl}`, movie, config)
    return response.data  
  }
  
  const removeFavs = async (movieId) => {
    const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }
  
    const response = await axios.delete(`${baseUrl}/${movieId}`, config)
    return response.data  
  }

  export default { getUserFavs, addFavs, removeFavs }