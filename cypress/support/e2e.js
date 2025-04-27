
import './commands'

// Faz com que o Cypress ignore exceptions não tratadas da aplicação
Cypress.on('uncaught:exception', (err, runnable) => {
    // return false para não falhar o teste
    return false;
  });
  