import axios from 'axios'

const baseUrl = '/app/usuario'

let token = ''

const setToken = newToken => {
  token = newToken
}

const getByName = (name) => {
    const config = {
        headers: { Authorization: token }
      }

    console.log(token)
    const response = axios.get(`${baseUrl}/${name}`, config)
    return response.then(response => response.data).catch(ex => new Error(ex))
    
}


export default { setToken, getByName }