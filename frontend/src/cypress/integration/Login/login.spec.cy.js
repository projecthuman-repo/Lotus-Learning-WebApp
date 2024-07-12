describe('User Authentication Tests', () => {
  const email = 'test@mail.com';
  const password = '12345678';

  it.only('should check hide password button', () => {
  cy.visit('/registration?screen=login');
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('svg.mx-1.text-black.cursor-pointer').should('be.visible').click();
  cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
  cy.get('svg.mx-1.text-black.cursor-pointer').should('be.visible').click();
  cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
  });

  it('should navigate to the institution sign-up page when clicking the institution button', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Institution').should('be.visible').click();
    cy.url().should('include', '/registration?screen=admin&phase=1');
  });

  it.only('should navigate to the student sign-up page and then check hide password buttons', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Student').should('be.visible').click();
    cy.get('svg.mx-1.text-black.cursor-pointer').eq(0).should('be.visible').click();
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text');
    cy.get('svg.mx-1.text-black.cursor-pointer').eq(0).should('be.visible').click();
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
    cy.get('svg.mx-1.text-black.cursor-pointer').eq(1).should('be.visible').click();
    cy.get('input[placeholder="Confirm Password"]').should('have.attr', 'type', 'text');
    cy.get('svg.mx-1.text-black.cursor-pointer').eq(1).should('be.visible').click();
    cy.get('input[placeholder="Confirm Password"]').should('have.attr', 'type', 'password');
  });


  it('should not proceed with invalid invitation code', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Institution').should('be.visible').click();
    cy.get('input[placeholder="#000000"]').type('password123');
    cy.contains('button', 'SUBMIT').should('be.visible').click();
    cy.url().should('eq', 'http://localhost:3000/registration?screen=admin&phase=1');
  });

  it('should proceed with valid invitation code', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Institution').should('be.visible').click();
    cy.get('input[placeholder="#000000"]').type('000000');
    cy.contains('button', 'SUBMIT').should('be.visible').click();
    cy.url().should('include', '&phase=2');
  });

  it('should show error for invalid email during sign-up', () => {
    cy.signUpStudent('Doer', 'Doe', 'example.com', 'johndoe123', 'password123', 'password123');
    cy.contains('Invalid Email type, or Email already being used').should('be.visible');
  });

  it('should show error for email already used during sign-up', () => {
    cy.signUpStudent('Doer', 'Doe', 'test@mail.com', 'johndoe123', 'password123', 'password123');
    cy.contains('Invalid Email type, or Email already being used').should('be.visible');
  });

  it('should show error for username already taken during sign-up', () => {
    cy.signUpStudent('Doer', 'Doe', 'test234@mail.com', 'test', 'password123', 'password123');
    cy.contains('Username is already taken, please try different username').should('be.visible');
  });

  it('should show error for mismatched passwords during sign-up', () => {
    cy.signUpStudent('Doer', 'Doe', 'r@example.com', 'johndoe123', 'password23', 'password123');
    cy.contains("Passwords don't match").should('be.visible');
  });

  it('should show error for short password during sign-up', () => {
    cy.signUpStudent('Doer', 'Doe', 'r@example.com', 'johndoe123', 'passwo', 'passwo');
    cy.contains('Password must be at least 8 characters long').should('be.visible');
  });

  it('should successfully sign up a student and redirect to correct page with exactly 8 letter password', () => {
    cy.signUpStudent('Doer', 'Doe', 'teystphasetes6tt@mail.com', 'johndoe536yt', 'password1', 'password1');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.deleteUser(); 
  });


  it('should successfully sign up a student and redirect to correct page with longer than 8 letter password', () => {
    cy.signUpStudent('Doer', 'Doe', 'teystphasetes6tt@mail.com', 'johndoe536yt', 'password123', 'password123');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.deleteUser(); 
  });

  it('should visit the login page', () => {
    cy.visitLoginPage();
    cy.url().should('include', '/registration?screen=login');
  });

  it('should successfully log in with valid credentials', () => {
    cy.login(email, password);
  });

  it('should successfully logout', () => {
    cy.login(email, password);
    cy.logout();
  });

  it('should navigate to the signup page when clicking the signup button', () => {
    cy.visitLoginPage();
    cy.contains('span', 'Sign up').should('be.visible').click();
    cy.url().should('include', '/registration?screen=signup&phase=1');
  });

  it('should navigate to the student sign-up page when clicking the student button', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Student').should('be.visible').click();
    cy.url().should('include', '/registration?screen=signup&phase=2&type=student');
  });

  it('should show error for empty required fields during sign-up', () => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Student').should('be.visible').click();
    cy.contains('button', 'Create account').click();
    cy.contains('Please fill all the data').should('be.visible');
  });



it('should show error for invalid institution code', () => {
  cy.visitSignUpPhase1();
  cy.contains('button', 'Student').should('be.visible').click();
  cy.get('input[placeholder="First Name"]').type('Doer');
  cy.get('input[placeholder="Last Name"]').type('Doe');
  cy.get('input[placeholder="Email"]').type('tester@example.com');
  cy.get('input[placeholder="Username"]').type('johndoe12356');
  cy.get('.slider-cointainer .slider')
  .click();
  cy.get('input#invcode').type('invalid-code');
  cy.get('input[placeholder="Password"]').type('password123');
  cy.get('input[placeholder="Confirm Password"]').type('password123');
  cy.contains('button', 'Create account').click();
  cy.contains('Institution code not found').should('be.visible');
});
});
