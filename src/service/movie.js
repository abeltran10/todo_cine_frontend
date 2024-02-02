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

const votar = async (movieId, userVoteId, vote) => {
  const config = {
    headers: { Authorization: window.localStorage.getItem('loggedUserToken') }
  }

  let url = `${baseUrl}/${movieId}/vote`
  let response = null
  if (userVoteId) {
    response =  await axios.put(`${url}/${userVoteId}`, vote, config)
  } else {
    response =  await axios.post(`${url}`, vote, config)
  }
   
  return response.data

}

export default { getAll, getByName, getMovieById, getMoviesPlayingNowByRegion, votar }