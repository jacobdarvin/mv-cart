describe('Login Test', () => {
  it('should navigate to the register page and fill out the form', () => {
    // Visit
    cy.visit('http://localhost:5173/login')

    cy.url().should('include', '/login')
    cy.get('form').should('be.visible')

    // Input
    cy.get('input[id="email"]').type('testuser@example.com')
    cy.get('input[id="password"]').type('123456')

    // Submit
    cy.get('button[type="submit"]').click()
  })
})
