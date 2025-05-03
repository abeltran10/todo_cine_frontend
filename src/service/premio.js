import axios from 'axios'

const baseUrl = '/app/premio'

const getPremiosByCodigoAnyo = async (premioCod, anyo, pagina) => {
    const config = {
      headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
    }
  
    const response = await axios.get(`${baseUrl}/${premioCod}/anyo/${anyo}?pagina=${pagina}`, config)
    return response.data
}

const getPremios = () => {
  const config = {
    headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
  }
  
    const response = axios.get(`${baseUrl}`, config)
    return response.then(response => response.data)  
}


export default {getPremiosByCodigoAnyo, getPremios}