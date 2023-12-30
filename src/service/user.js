import axios from 'axios'

const baseUrl = '/app/usuario'

let token = ''

const setToken = newToken => {
  token = newToken
}

const getByName = async (name) => {
    const config = {
        headers: { Authorization: token }
      }

    console.log(token)
    const response = await axios.get(`${baseUrl}/${name}`, config)
    return response.data
}


export default { setToken, getByName }