describe('players', () => {
  it("can move Fu to allowed square", () => {
    const validate_first = (txt) => {
      cy.removeListener('window:alert', validate_first)
      cy.on('window:alert', validate_second)
      return true
    }
    const validate_second = (txt) => {
      cy.removeListener('window:alert', validate_second)
      cy.on('window:alert', validate_move)
      return true
    }
    const validate_move = (txt) => {
      assert(false)
      true
    }
    cy.visit('http://localhost:3000')
    cy.get('#first-80').click()
    cy.on('window:alert', validate_first)
    cy.wait(10000)
    cy.get('#second-80').click()
    cy.wait(10000)
    cy.get('#second').get('#second-description').should('have.text', '相手番です。')

    cy.get('#first-61').click()
    cy.get('#first-52').click()
    cy.wait(10000)
  })
})
