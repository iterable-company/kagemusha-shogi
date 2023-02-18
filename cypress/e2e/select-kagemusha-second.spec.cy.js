describe('players can select kagemusha', () => {
  it('second player', () => {
    cy.visit('http://localhost:3000')
    cy.get('#first').get('#first-description').should('have.text', '影武者を選んでください')
    cy.get('#first-80').click()
    cy.on('window:alert', (txt) => {
      return true
    })
    cy.wait(10000)
    cy.get('#first').get('#first-description').should('have.text', '相手番です。')
    cy.get('#second').get('#second-description').should('have.text', '影武者を選んでください')
    cy.get('#second-79').click()
    cy.on('window:alert', (txt) => {
      return true
    })
    cy.wait(10000)
    cy.get('#second').get('#second-description').should('have.text', '相手番です。')
  })
})
