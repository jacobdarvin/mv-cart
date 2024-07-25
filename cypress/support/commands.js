Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login')

  cy.url().should('include', '/login')
  cy.get('form').should('be.visible')

  // Input
  cy.get('input[id="email"]').type(email)
  cy.get('input[id="password"]').type(password)

  // Submit
  cy.get('button[type="submit"]').click()
})
