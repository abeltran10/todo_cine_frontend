// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (user) => {
    cy.request('POST', 'http://localhost:8082/app/login', user).then(response => {
      localStorage.setItem('loggedUserToken', response.headers.authorization)
    }).then(() => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8082/app/usuario/username/userTest',
        headers: {
          Authorization: localStorage.getItem('loggedUserToken')
        }
      }).then(response => {
        localStorage.setItem('loggedUserMovie', JSON.stringify(response.body))
      })
    })
  
    cy.visit('http://localhost:3000')
  })
  
 /* Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    const user = JSON.parse(localStorage.getItem('loggedUserMovie'))
    cy.request({
      url: 'http://localhost:3003/app/blogs',
      method: 'POST',
      body: { title, author, url },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  }) */