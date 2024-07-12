describe('Forgot Password Tests', () => {
  it('should show an error if the email does not exist', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('password123@t');
    cy.contains('Email does not exist').should('be.visible');
  });

  it('should navigate to OTP verification page if the email exists', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.url().should('include', '/verifyotp');
  });

  it('should show an error for an invalid OTP thats the right length', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.enterOTPAndSubmit('123456');
    cy.contains('Invalid or expired OTP').should('be.visible');
  });

  it('should show an error for an invalid OTP thats too short', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.enterOTPAndSubmit('123');
    cy.contains('Invalid or expired OTP').should('be.visible');
  });


  it('should show an error for an invalid OTP', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.enterOTPAndSubmit('123456');
    cy.contains('Invalid or expired OTP').should('be.visible');
  });

  it('should navigate to change password screen and show an error for mismatched passwords', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.wait(5000);
    cy.fetchOtp('gordonsortan@gmail.com').then((otp) => {
      cy.enterOTPAndSubmit(otp);
      cy.url().should('include', '/ChangePassword');
      cy.changePassword('12345678', '1234544478');
      cy.contains('Passwords do not match!').should('be.visible');
    });
  });

  it('should navigate to change password screen and successfully change the password', () => {
    cy.navigateToForgotPassword();
    cy.enterEmailAndSubmit('gordonsortan@gmail.com');
    cy.wait(5000);
    cy.fetchOtp('gordonsortan@gmail.com').then((otp) => {
      cy.enterOTPAndSubmit(otp);
      cy.url().should('include', '/ChangePassword');
      cy.changePassword('12345678', '12345678');
      cy.url().should('include', '/home');
    });
  });
});

      function generateOTP() {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
    

