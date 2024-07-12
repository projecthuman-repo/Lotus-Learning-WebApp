describe('Institution Sign-Up Tests', () => {
  beforeEach(() => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Institution').should('be.visible').click();
  });

  it('should navigate to the institution sign-up page when clicking the institution button', () => {
    cy.url().should('include', '/registration?screen=admin&phase=1');
  });

  it('If invitation code is not in database, disallow moving forward from here', () => {
    cy.enterInvitationCode('password123');
    cy.url().should('eq', 'http://localhost:3000/registration?screen=admin&phase=1');
  });

  it('If invitation code is in database, proceed to next page', () => {
    cy.enterInvitationCode('000000');
    cy.url().should('include', '&phase=2');
  });

  it('Check if email is wrong for institution account', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test', 'test', 'test1234', 'test1234');
    cy.contains('Invalid Email type, or Email already being used').should('be.visible');
  });

  it('Check if email is already used for institution account', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test@mail.com', 'test', 'test1234', 'test1234');
    cy.contains('Invalid Email type, or Email already being used').should('be.visible');
  });

  it('Check if username is already used for institution account', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test234@mail.com', 'test', 'test1234', 'test1234');
    cy.contains('Username is already taken, please try different username').should('be.visible');
  });

  it('Check if passwords do not match for institution account', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test234@mail.com', 'test', 'test1234', 'test12345');
    cy.contains("Passwords don't match").should('be.visible');
  });

  it('Check if password is too short for institution account', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test234@mail.com', 'test', 'tes34', 'tes34');
    cy.contains('Password must be at least 8 characters long').should('be.visible');
  });

  it('check successful sign-up for institution if password is 8 characters', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test234@mail.com', 'testtesttest', 'tes12334', 'tes12334');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.deleteUser();
  });

  it('Successful sign-up for institution if password is longer than 8 characters', () => {
    cy.enterInvitationCode('000000');
    cy.createInstitutionAccount('test234@mail.com', 'testtesttest', 'tes123346', 'tes123346');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.deleteUser();
  });
});