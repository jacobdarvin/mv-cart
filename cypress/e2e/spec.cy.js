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

describe('Top Up', () => {
  beforeEach(() => {
    cy.login('1@gmail.com', '123456')
  })

  it('should top up and add money', () => {
    cy.get('a[href="/topup"]').click()
    cy.url().should('eq', 'http://localhost:5173/topup')
    cy.contains('Top-up').should('be.visible')

    cy.get('input[id="cardholderName"]').type('John Doe')
    cy.get('input[id="cardNumber"]').type('1234 5678 9012 3456')
    cy.get('input[id="address"]').type('123 Main St, City, Country')
    cy.get('input[id="cvc"]').type('123')
    cy.get('input[id="expirationDate"]').type('12/34')
    cy.get('input[id="amount"]').type('150')

    cy.get('button[type="submit"]').click()

    cy.contains('Top-up successful. Enjoy your balance!').should('be.visible')
  })
})

describe('Purchasing', () => {
  beforeEach(() => {
    cy.login('1@gmail.com', '123456')
  })

  it('should open a product and purchase it', () => {
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('button').contains('View Product').first().click()

    cy.url().should('include', '/product/')
    cy.contains('Add to Cart').should('be.visible')

    cy.get('button').contains('Add to Cart').click()

    cy.get('a').contains('Proceed to Checkout').click()
    cy.url().should('include', '/cart')

    cy.get('button').contains('Confirm Purchase').click()

    cy.url().should('include', '/success')
    cy.contains('Purchase Successful').should('be.visible')
  })
})
