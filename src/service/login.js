import axios from 'axios'
const baseUrl = '/app/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.headers
}

const logout = async () => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  await axios.post('/app/logout', null, config)
}

export default { login, logout }