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
      cy.login({ username: 'cypress', password: 'cypresstesting' })
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
      cy.createBlog({
        title: 'A cypress blog title',
        author: 'A cypress author',
        url: 'google.com',
      })

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('A cypress blog title').parent().find('.like-button').click()
      cy.contains('likes 1')
    })

    it('The user who created a blog can delete it', function () {
      cy.createBlog({
        title: 'A cypress blog title',
        author: 'A cypress author',
        url: 'google.com',
      })

      cy.contains('view').click()
      cy.contains('remove').click()

      cy.should('not.contain', 'A cypress blog title')
    })

    it('A user who did not create a blog cannot delete it', function () {
      cy.createBlog({
        title: 'A cypress blog title',
        author: 'A cypress author',
        url: 'google.com',
      })

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

      cy.login({ username: 'cypress2', password: 'cypresstesting2' })

      cy.contains('A cypress blog title')
      cy.contains('A cypress author')
      cy.contains('view').click()
      cy.should('not.contain', 'remove')
    })

    it('Orders blog posts correctly by like count', function () {
      cy.createBlog({
        title: 'A first cypress blog title',
        author: 'A first cypress author',
        url: 'google.com',
      })

      cy.createBlog({
        title: 'A second cypress blog title',
        author: 'A second cypress author',
        url: 'google.com',
      })

      cy.createBlog({
        title: 'A third cypress blog title',
        author: 'A third cypress author',
        url: 'google.com',
      })

      cy.get('.blog').each(($blog, index) => {
        cy.wrap($blog).find('.view-button').click()
        const wordsBefore = ['first', 'second', 'third']
        cy.wrap($blog).contains('likes 0')
        cy.wrap($blog).contains(`A ${wordsBefore[index]} cypress blog title`)
      })

      cy.get('.blog').each(($blog, index) => {
        for (let i = 0; i <= index; i++) {
          cy.wrap($blog).find('.like-button').click()
          cy.wrap($blog).contains(`likes ${i + 1}`)
        }
      })

      cy.get('.blog').each(($blog, index) => {
        const wordsAfter = ['third', 'second', 'first']
        cy.wrap($blog).contains(`likes ${3 - index}`)
        cy.wrap($blog).contains(`A ${wordsAfter[index]} cypress blog title`)
      })
    })
  })
})
