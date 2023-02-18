describe('players can select kagemusha', () => {
  it('first player', () => {
    cy.visit('http://localhost:3000')
    cy.get('#first').get('#first-description').should('have.text', '影武者を選んでください')
    cy.get('#first-80').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('1: 影武者が選択されました。')
      return true
    })
    cy.wait(10000)
    cy.get('#first').get('#first-description').should('have.text', '相手番です。')
    cy.wait(10000)
  })
})
