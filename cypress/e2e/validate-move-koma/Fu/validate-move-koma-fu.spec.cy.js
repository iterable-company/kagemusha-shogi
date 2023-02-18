describe('players can select kagemusha', () => {
  it('first player', () => {
    cy.visit('http://localhost:3000')
    cy.get('#first-80').click()
    cy.on('window:alert', (txt) => {
      return true
    })
    cy.wait(10000)
    cy.get('#second-80').click()
    cy.on('window:alert', (txt) => {
      return true
    })
    cy.wait(10000)
    cy.get('#first-description').should('have.text', 'あなたの手番です。')
    cy.wait(10000)
    cy.get('#second-61').click()
  })
})
