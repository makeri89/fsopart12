describe('Bloglist tests', function() {
    describe('Page load and login tests', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'markus',
                username: 'makeri',
                password: 'salainen'
            }
            cy.request('POST', 'http://localhost:3003/api/users', user)
            cy.visit('http://localhost:3000')
        })
        it('front page can be opened', function() {
            cy.contains('Login')
        })
    
        it('login succesful', function() {
            cy.get('#username').type('makeri')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
    
            cy.contains('Logged in as markus')
        })
    
        it('login fails', function () {
            cy.get('#username').type('makeri')
            cy.get('#password').type('vaara')
            cy.get('#login-button').click()
    
            cy.get('.error').should('contain', 'wrong credentials')
        })

        describe('While logged in', function() {
            beforeEach(function() {
                cy.login({ username: 'makeri', password: 'salainen' })
            })

            it('A new blog is added', function() {
                cy.contains('add a new blog').click()
                cy.get('#title').type('Cypress blog')
                cy.get('#author').type('Cypress')
                cy.get('#url').type('cypress.org')
                cy.get('#submit-blog-button').click()

                cy.contains('a new blog Cypress blog by Cypress added')
            })

            describe('After a blog is added', function() {
                beforeEach(function() {
                    cy.contains('add a new blog').click()
                    cy.get('#title').type('Cypress blog')
                    cy.get('#author').type('Cypress')
                    cy.get('#url').type('cypress.org')
                    cy.get('#submit-blog-button').click()
                })

                it('Blog can be expanded', function() {
                    cy.get('#viewButton').click()
                    cy.contains('This blog has 0 likes')
                })

                it('Blog can be liked', function() {
                    cy.get('#viewButton').click()
                    cy.get('#likeButton').click()
                    cy.contains('This blog has 1 likes')
                    cy.get('#likeButton').click()
                    cy.contains('This blog has 2 likes')
                })

                it('Blog can be deleted', function() {
                    cy.visit('http://localhost:3000')
                    cy.get('#viewButton').click()
                    cy.get('#deleteButton').click()
                    cy.get('html').should('not.contain','This blog has')
                })

                // This test checks that the blog with most likes is first on the page
                it.only('Blogs are arranged by likes', function() {
                    cy.contains('add a new blog').click()
                    cy.get('#title').type('testiblogi')
                    cy.get('#author').type('Cypressor')
                    cy.get('#url').type('cypress.org')
                    cy.get('#submit-blog-button').click()

                    cy.contains('testiblogi Cypressor').contains('view').click()
                    cy.contains('like').click()
                    cy.contains('like').click()
                    cy.contains('hide').click()
                    cy.contains('Cypress blog').contains('view').click()
                    cy.contains('like').click()
                    cy.contains('hide').click()
                    
                    cy.get('.initialBlog').first().contains('testiblogi')
                })
            })
        })
    })
})