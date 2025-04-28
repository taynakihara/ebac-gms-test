/// <reference types="cypress" />

describe('Funcionalidade Busca', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve realizar busca com sucesso', () => {
        
        cy.get('#search-input').type('Matrix');
        cy.get('#search-button').click();
        cy.get('#results-section').should('contain', 'Matrix');
    });

    it('Deve buscar filmes com sucesso de uma lista', () => {
        
        cy.fixture('filmes').then((filmes) => {
            cy.get('#search-input').type(filmes[2].titulo);
            cy.get('#search-button').click();
            cy.get('#results-section').should('contain', filmes[2].titulo);
            cy.get('#search-input').clear(); // Limpa o campo de busca para a próxima iteração
            });
        });
    
    it('Deve buscar filmes com sucesso de uma lista inteira', () => {

        cy.fixture('filmes').each((filmes) => {
            cy.get('#search-input').clear().type(filmes.titulo);
            cy.get('#search-button').click();
            cy.get('#results-section').should('contain', filmes.titulo);        
            });
        });
});