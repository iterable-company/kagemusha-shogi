describe('players', () => {
  it('can select kagemusha', () => {
    const validate_first = (txt) => {
      expect(txt).to.contains('1: 影武者が選択されました。')
      cy.removeListener('window:alert', validate_first)
      cy.on('window:alert', validate_second)
      return true
    }
    const validate_second = (txt) => {
      expect(txt).to.contains('2: 影武者が選択されました。')
      return true
    }
    cy.visit('http://localhost:3000')
    cy.get('#first').get('#first-description').should('have.text', '影武者を選んでください')
    cy.get('#first-80').click()
    cy.on('window:alert', validate_first)
    cy.wait(10000)
    cy.get('#first').get('#first-description').should('have.text', '相手番です。')
    cy.get('#second').get('#second-description').should('have.text', '影武者を選んでください')
    cy.get('#second-79').click()
    cy.wait(10000)
    cy.get('#second').get('#second-description').should('have.text', '相手番です。')
  })
})
