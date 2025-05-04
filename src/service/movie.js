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

const getDetailMovieById = async (id) => {
  const config = {
    headers: {Authorization: window.localStorage.getItem('loggedUserToken')}
  }

  const response = await axios.get(`${baseUrl}/${id}/detail`, config)
  return response.data
}

const getMoviesPlayingNowByRegion = async (region, page) => {
  const config = {
      headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
    }

  const response =  await axios.get(`${baseUrl}/now?region=${region}&page=${page}`, config)
  return response.data
}

const votar = async (movieId, vote) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  const response =  await axios.put(`${baseUrl}/${movieId}/vote`, vote, config)
     
  return response.data

}

export default { getAll, getByName, getDetailMovieById, getMoviesPlayingNowByRegion, votar }