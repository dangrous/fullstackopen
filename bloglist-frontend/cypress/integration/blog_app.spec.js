describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Tester',
      username: 'cypress',
      password: 'cypresstesting',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypresstesting')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.should('not.contain', 'blogs')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'cypress',
        password: 'cypresstesting',
      }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A cypress blog title')
      cy.get('#author').type('A cypress author')
      cy.get('#url').type('google.com')
      cy.get('#blog-button').click()

      cy.contains('A cypress blog title')
      cy.contains('A cypress author')
    })

    it('A blog can be liked', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A cypress blog title')
      cy.get('#author').type('A cypress author')
      cy.get('#url').type('google.com')
      cy.get('#blog-button').click()

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('A cypress blog title').parent().find('.like-button').click()
      cy.contains('likes 1')
    })

    it('The user who created a blog can delete it', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A cypress blog title')
      cy.get('#author').type('A cypress author')
      cy.get('#url').type('google.com')
      cy.get('#blog-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.should('not.contain', 'A cypress blog title')
    })

    it.only('A user who did not create a blog cannot delete it', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('A cypress blog title')
      cy.get('#author').type('A cypress author')
      cy.get('#url').type('google.com')
      cy.get('#blog-button').click()

      cy.contains('A cypress blog title')
      cy.contains('A cypress author')
      cy.contains('view').click()
      cy.contains('remove')

      const user = {
        name: 'Cypress Tester Two',
        username: 'cypress2',
        password: 'cypresstesting2',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.contains('logout').click()

      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'cypress2',
        password: 'cypresstesting2',
      }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })

      cy.contains('A cypress blog title')
      cy.contains('A cypress author')
      cy.contains('view').click()
      cy.should('not.contain', 'remove')
    })
  })
})
