// tests run in dev mode
describe('Login page', () => {

  Cypress.Cookies.debug(true)

  it('Visits the login page while not logged in', () => {
    cy.visit(`http://localhost:8080/`)
    cy.clearCookies()
  })

  it('redirects to login while not logged in', () => {
    cy.clearCookies()
    cy.visit(`http://localhost:8080/main`)
    cy.url().should('equal', 'http://localhost:8080/')
  })

  it('redirects to login when incorrect email/password used', () => {
    cy.clearCookies()
    cy.visit(`http://localhost:8080/`)
    cy.get('#email').type('fakeassemail@gmail.fom').should('have.value', 'fakeassemail@gmail.fom')
    cy.get('#password').type('fakeasspass123').should('have.value', 'fakeasspass123')
    cy.get('#sign_in').click()
    cy.url().should('equal', 'http://localhost:8080/')
    cy.get('#incorrectCreds')
  })

  it('redirects to /main when correct email/password used', () => {
    cy.clearCookies()
    cy.visit(`http://localhost:8080/`)
    cy.get('#email').type('eric3@gmail.com').should('have.value', 'eric3@gmail.com')
    cy.get('#password').type('eric3').should('have.value', 'eric3')
    cy.get('#sign_in').click()
    cy.url().should('equal', 'http://localhost:8080/main')
  })

  it('renders signup component when user clicks the "don\'t have an account" button', () => {
    cy.clearCookies()
    cy.visit(`http://localhost:8080/`)
    cy.get('#registration').click()
    cy.get('#name')
  })

  it('redirects to /main when new name/email/password entered', () => {
    cy.clearCookies()
    cy.visit(`http://localhost:8080/`)
    cy.get('#registration').click()
    const randomID = Math.floor(Math.random()*1000000);
    cy.get('#name').type(`eric${randomID}`).should('have.value', `eric${randomID}`)
    cy.get('#email').type(`eric${randomID}@gmail.com`).should('have.value', `eric${randomID}@gmail.com`)
    cy.get('#password').type(`eric${randomID}`).should('have.value', `eric${randomID}`)
    cy.get('#sign_in').click()
    
    cy.url().should('equal', 'http://localhost:8080/main')
  })
  
})