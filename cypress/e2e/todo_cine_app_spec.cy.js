describe('Todo cine', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:8080/app/testing/reset')
      const user = {
        username: 'userTest',
        password: '1234'
      }
      cy.request('POST', 'http://localhost:8080/app/usuario', user)
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Entrar')
      })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('userTest')
          cy.get('#password').type('1234')
          cy.get('#login-submit').click()
          cy.contains('Signed as userTest')
        })
    
        it('fails with wrong credentials', function() {
          cy.get('#username').type('mr. x')
          cy.get('#password').type('xxxx')
          cy.get('#login-submit').click()
          cy.contains('Usuario o contraseña incorrectos')
        })
      })

      describe.only('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'userTest', password: '1234' })
        })

        it('search movie', function() {
          cy.get('#moviename').type('star wars')
          cy.get('#search-submit').click()
          cy.contains('Detalle')
        })

        it('add to favourite', function() {
          cy.get('#moviename').type('star wars')
          cy.get('#search-submit').click()
          cy.get('.detalleButton').then(detailButton => detailButton[0].click())
          cy.get('.addFavsButton').click()
          cy.contains('Quitar de favoritos')
        })

      })
    })