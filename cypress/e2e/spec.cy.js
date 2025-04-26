/// <reference types="cypress" />

describe('Funcionalidade Cadastro de membros', () => {
  it('Deve fazer o cadastro de campos obrigatórios', () => {

    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type('Tayna')
    cy.get('#signup-lastname').type('Kihara')
    cy.get('#signup-email').type('taynakihara123@teste.com')
    cy.get('#signup-password').type('Password@123')
    cy.get('#signup-button').click()
    cy.get('#signup-password').should('contain', 'Cadastro realizado com sucesso!')
  })
})