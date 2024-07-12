it('Successfully navigate from home page to create account sign-up', () => {
    // Visit the sign-up phase 1 option
    cy.visit('/home');

    // Find the Institution button and click it
    cy.contains('button', 'Create an account').should('be.visible').click();

    cy.url().should('include', '/registration?screen=signup&phase=1');
  });

  it('Successfully navigate from home page to login page', () => {
    // Visit the sign-up phase 1 option
    cy.visit('/home');

    // Find the Institution button and click it
    cy.contains('button', 'Sign In').should('be.visible').click();

    cy.url().should('include', '/registration?screen=login');
  });