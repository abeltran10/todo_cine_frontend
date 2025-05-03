import axios from 'axios'

const baseUrl = '/app/usuario/'


const updateUsuarioMovie = async (userId, movieId, usuarioMovie) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }
  
    const response =  await axios.put(`${baseUrl}/${userId}/movie/${movieId}`, usuarioMovie, config)
    return response.data
  }

export default {updateUsuarioMovie}