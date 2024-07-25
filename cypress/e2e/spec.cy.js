describe('Navigation', () => {
  beforeEach(() => {
    cy.login('1@gmail.com', '123456')
  })

  it('should navigate to the home page', () => {
    cy.url().should('eq', 'http://localhost:5173/')
    cy.contains("COP'D").should('be.visible')
  })

  it('should navigate to the cart page', () => {
    cy.get('a[href="/cart"]').click()
    cy.url().should('eq', 'http://localhost:5173/cart')
    cy.contains("COP'D").should('be.visible')
  })

  it('should navigate to the topup page', () => {
    cy.get('a[href="/topup"]').click()
    cy.url().should('eq', 'http://localhost:5173/topup')
    cy.contains('Top-up').should('be.visible')
  })

  it('should navigate to the purchases page', () => {
    cy.get('a[href="/purchases"]').click()
    cy.url().should('eq', 'http://localhost:5173/purchases')
    cy.contains('Purchases').should('be.visible')
  })

  it('should be able to logout', () => {
    cy.get('button').contains('Logout').click()
    cy.url().should('eq', 'http://localhost:5173/login')
    cy.contains('Login').should('be.visible')
  })
})
