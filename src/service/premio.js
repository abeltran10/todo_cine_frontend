import axios from 'axios'

const baseUrl = '/app/premio'

const getPremiosByCodigo = async (codigo) => {
    const config = {
      headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
    }
  
    const response = await axios.get(`${baseUrl}/${codigo}`, config)
    return response.data
}


export default {getPremiosByCodigo}