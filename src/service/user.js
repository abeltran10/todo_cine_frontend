import axios from 'axios'
const baseUrl = '/app/usuario'


const getByName = (name) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response = axios.get(`${baseUrl}/${name}`, config)
    return response.then(response => response.data).catch(ex => new Error(ex))
    
}


export default { getByName }