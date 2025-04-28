/// <reference types="cypress" />
import { generateUserData } from '../support/generateData';



describe('Funcionalidade Cadastro de membros', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve validar preenchimento de campos obrigatórios e realizar cadastro com sucesso', () => {

    const user = generateUserData();
  
    // 1) Submeter sem nada - erro de NOME vazio
    cy.get('#signup-button').click();
    cy.get('#signup-response')
      .should('contain', 'Nome não pode estar vazio');
  
    // 2) Preencher NOME
    cy.get('#signup-firstname').type(user.firstName);
  
    // 3) Submeter - erro de SOBRENOME vazio
    cy.get('#signup-button').click();
    cy.get('#signup-response')
      .should('contain', 'Sobrenome não pode estar vazio');
  
    // 4) Preencher SOBRENOME
    cy.get('#signup-lastname').type(user.lastName);
  
    // 5) Submeter - erro de EMAIL vazio
    cy.get('#signup-button').click();
    cy.get('#signup-response')
      .should('contain', 'E-mail não pode estar vazio');
  
    // 6) Preencher EMAIL
    cy.get('#signup-email').type(user.email);
  
    // 7) Submeter - erro de TELEFONE inválido
    cy.get('#signup-phone').type('fsf2d11fdsf');
    cy.get('#signup-button').click();
    cy.get('#signup-response')
      .should('contain', 'Telefone deve conter apenas números');
  
    // 8) Limpar e preencher TELEFONE válido
    cy.get('#signup-phone').clear().type('11987654321');
  
    // 9) Submeter - erro de SENHA vazia
    cy.get('#signup-button').click();
    cy.get('#signup-response')
      .should('contain', 'Senha não pode estar vazia');

    // 10) Preencher SENHA
    cy.get('#signup-password').type('Password@123');

    // 11) Finalmente, submeter tudo válido e verificar sucesso
    cy.get('#signup-button').click();
    cy.get('#signup-response')
    .should('contain', 'Cadastro realizado com sucesso!');
  })

  it('Deve validar email já cadastrado', () => {

    cy.get('#signup-firstname').type('Tayna')
    cy.get('#signup-lastname').type('Kihara')
    cy.get('#signup-email').type('taynakihara@teste.com')
    cy.get('#signup-password').type('Password@123')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Este email já está cadastrado.')
  })

  it('Deve validar email inválido', () => {

    cy.get('#signup-firstname').type('Tayna')
    cy.get('#signup-lastname').type('Kihara')
    cy.get('#signup-email').type('test-teste.com')
    cy.get('#signup-password').type('Password@123')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'E-mail deve ser um email válido')
  })

  it('Deve validar senha fraca', () => {

    const user = generateUserData();

    cy.get('#signup-firstname').type(user.firstName)
    cy.get('#signup-lastname').type(user.lastName)
    cy.get('#signup-email').type(user.email)
    cy.get('#signup-password').type('12345678')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)')
  })

  it('Deve validar redirecionamento para página de política de privacidade', () => {

    cy.contains('a', 'Política de Privacidade').click();
    cy.url().should('include', 'polices.html');
  });
  
})

