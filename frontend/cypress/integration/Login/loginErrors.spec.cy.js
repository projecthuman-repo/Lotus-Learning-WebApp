it('when wrong password is entered, should stay on same page showing error message', () => {
    cy.visit('/registration?screen=login');
    // Enter email
   
    cy.get('input[placeholder="Email"]').type('test@mail.com');
    // Enter password
    cy.get('input[type="password"]').type('test123');
    // Click the login button
    cy.contains('button', 'Login').click();

    // Verify that the user is still on the same page and error message pops up
    cy.url().should('include', '/registration?screen=login');
  });

  it('when wrong username is entered, should stay on same page showing error message', () => {
    cy.visit('/registration?screen=login');
    // Enter email
   
    cy.get('input[placeholder="Email"]').type('tes@mail.com');
    // Enter password
    cy.get('input[type="password"]').type('test1234');
    // Click the login button
    cy.contains('button', 'Login').click();

    // Verify that the user is still on the same page and error message pops up
    cy.url().should('include', '/registration?screen=login');
  });

 