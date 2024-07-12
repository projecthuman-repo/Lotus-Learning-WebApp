it('should navigate to the teacher sign-up page when clicking the teacher button', () => {
    // Visit the sign-up phase 1 option
    cy.visit('/registration?screen=signup&phase=1');

    // Find the teacher button and click it
    cy.contains('button', 'Teacher').should('be.visible').click();

    // Assert that the URL is now the signup page for the teacher
    cy.url().should('include', '/registration?screen=signup&phase=2&type=instructor');
});
    it('should successfully sign up teacher account and re-direct to correct page', () => {
      cy.visit('/registration?screen=signup&phase=1');
      cy.contains('button', 'Teacher').should('be.visible').click();
      cy.get('input[placeholder="First Name"]').type('Doer');
      cy.get('input[placeholder="Last Name"]').type('Doe');
      cy.get('input[placeholder="Email"]').type('teystphasetes6tt@mail.com');
      cy.get('input[placeholder="Username"]').type('johndoe536yt');
      cy.get('input[placeholder="Password"]').type('password123');
      cy.get('input[placeholder="Confirm Password"]').type('password123');
      cy.contains('button', 'Create account').click();
  
      cy.url().should('eq', 'http://localhost:3000/');

      cy.deleteUser();
    });