describe('Todo cine', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:8082/app/testing/reset')
      const user = {
        username: 'userTest',
        password: '1234'
      }
      cy.request('POST', 'http://localhost:8082/app/usuario', user)
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login-form')
      })
    })