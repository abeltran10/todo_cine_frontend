import userService from '../service/user'

const isTokenValid = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    
    if (loggedUser) {
        const user = JSON.parse(loggedUser)
        console.log(user)
        const response = userService.getUser(user.id)
        
        response.then(response => {
                window.localStorage.setItem('loggedUser', JSON.stringify(response))
            }).catch(error => {
                window.localStorage.removeItem('loggedUserToken')
                window.localStorage.removeItem('loggedUser')
            })   
            
    }
    
    return window.localStorage.getItem('loggedUser') != null
  }


  export default isTokenValid