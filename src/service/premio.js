import axios from 'axios'

const baseUrl = '/app/premio'

const getPremiosByCodigoAnyo = async (premioCod, anyo) => {
    const config = {
      headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
    }
  
    const response = await axios.get(`${baseUrl}/${premioCod}/anyo/${anyo}`, config)
    return response.data
}


export default {getPremiosByCodigoAnyo}