import axios from 'axios'

const baseUrl = '/app/movie'
    
const getAll = () => {
  const response = axios.get(baseUrl)
  
  return response.then(response => response.data)
}

const getByName = async (name, page) => {
    const config = {
        headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
      }

    const response =  await axios.get(`${baseUrl}/search?name=${name}&page=${page}`, config)
    return response.data
}

const getMovieById = async (id) => {
  const config = {
    headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
  }

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const getMoviesPlayingNowByRegion = async (region, page) => {
  const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }

  const response =  await axios.get(`${baseUrl}/now?region=${region}&page=${page}`, config)
  return response.data
}

export default { getAll, getByName, getMovieById, getMoviesPlayingNowByRegion }