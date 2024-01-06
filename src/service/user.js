import axios from 'axios'
const baseUrl = '/app/usuario'


const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/username/${name}`, config)
    return response.then(response => response.data)  
}


export default { getByName }