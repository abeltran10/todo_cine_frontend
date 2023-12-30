import axios from 'axios'
const baseUrl = '/app/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.headers
}

export default { login }