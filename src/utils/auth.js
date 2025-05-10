import userService from '../service/user'

const isTokenValid = async () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
  
    if (!loggedUser) return false
  
    const user = JSON.parse(loggedUser)
  
    try {
      const response = await userService.getUser(user.id)
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      return true
    } catch (error) {
      window.localStorage.removeItem('loggedUserToken')
      window.localStorage.removeItem('loggedUser')
      return false
    }
  }
  
  export default isTokenValid