// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';



Cypress.Commands.add('deleteUser', () => {
   
    cy.request('GET', 'http://localhost:5000/user/latest-user').then((response) => {
      expect(response.status).to.equal(200);
      const latestUserId = response.body.user._id;
      
      cy.request({
        method: 'DELETE',
        url: `http://localhost:5000/user/delete-user/${latestUserId}`,
        failOnStatusCode: false 
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.success).to.be.true;
      });
    });
  });

  Cypress.Commands.add('createCourse', (courseData) => {
    return cy.request('POST', 'http://localhost:5000/course/create-new-course', courseData)
      .then((response) => {
        expect(response.status).to.eq(200); 
        return response.body; 
      });
  });

  Cypress.Commands.add('deleteLatestCourse', () => {
    cy.request('GET', 'http://localhost:5000/course/latest-course').then((response) => {
      const courseId = response.body.course._id;
      cy.request('DELETE', 'http://localhost:5000/course/delete-course-by-id', { id: courseId });
    });
  });

  Cypress.Commands.add('fetchOtp', (email) => {
    return cy.request({
      method: 'GET',
      url: `http://localhost:5000/user/get-otp/${email}`, 
      failOnStatusCode: false,
    }).then((response) => {
     
      return response.body.user;
    });
  });

  Cypress.Commands.add('login', (email, password) => {
    cy.visit('/registration?screen=login');
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('button', 'Login').should('be.visible').click();
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });
  
  Cypress.Commands.add('navigateToCreateCourse', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.get('.p-2.border-b.flex.items-center').click();
    cy.contains("My Courses").should('be.visible').click();
    cy.contains('button', 'Create new course').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
  });
  
  Cypress.Commands.add('fillCourseDetails', (title, description, objectives) => {
    cy.get('input[placeholder="Set a title"]').type(title);
    cy.get('textarea[placeholder="Set a description"]').clear().type(description);
    cy.contains('button', 'Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/2');
  
   // cy.get('.p-2.border.flex.items-center.justify-between.bg-stone-50').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]')
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});

    cy.get('.absolute.z-30').contains('Math').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Science').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Design').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('IT').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Software').click();
    cy.contains('button', 'Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
  
    cy.get('input[placeholder="Objective one"]').type(objectives[0]);
    cy.get('input[placeholder="Objective two"]').type(objectives[1]);
    cy.get('input[placeholder="Objective three"]').type(objectives[2]);
    cy.contains('button', 'Next').should('be.visible').click();
  });

  Cypress.Commands.add('fillAddTooManySubjects', (title, description, objectives) => {
    cy.get('input[placeholder="Set a title"]').type(title);
    cy.get('textarea[placeholder="Set a description"]').clear().type(description);
    cy.contains('button', 'Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/2');
  
   
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});

    cy.get('.absolute.z-30').contains('Math').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Science').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Design').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('IT').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Software').click();

    cy.get('svg.text-xl[viewBox="0 0 512 512"]') 
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});
    cy.get('.absolute.z-30').contains('Business').click();
    
    cy.contains('button', 'Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
  
    cy.get('input[placeholder="Objective one"]').type(objectives[0]);
    cy.get('input[placeholder="Objective two"]').type(objectives[1]);
    cy.get('input[placeholder="Objective three"]').type(objectives[2]);
    cy.contains('button', 'Next').should('be.visible').click();
  });
  
  Cypress.Commands.add('completeCourseCreation', () => {
 
    cy.get('.arrow').trigger('mousedown', { which: 1 }).trigger('mousemove', { which: 1, clientX: 812 }).trigger('mouseup');
    cy.contains('button', 'Finish').should('be.visible').click();
    cy.url({ timeout: 15000 }).should('include', 'profile/course-editor/homePage/');
  });
  
  Cypress.Commands.add('visitSignUpPhase1', () => {
    cy.visit('/registration?screen=signup&phase=1');
  });
  
  Cypress.Commands.add('enterInvitationCode', (code) => {
    cy.get('input[placeholder="#000000"]').type(code);
    cy.contains('button', 'SUBMIT').should('be.visible').click();
  });
  
  Cypress.Commands.add('createInstitutionAccount', (email, academyName, password, confirmPassword) => {
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Academy name"]').type(academyName);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type(confirmPassword);
    cy.contains('button', 'Create account').click();
  });
 
  Cypress.Commands.add('visitLoginPage', () => {
    cy.visit('/registration?screen=login');
  });
  
  Cypress.Commands.add('login', (email, password) => {
    cy.visitLoginPage();
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('button', 'Login').should('be.visible').click();
    cy.url({timeout:15000}).should('eq', 'http://localhost:3000/');
  });
  
  Cypress.Commands.add('logout', () => {
    cy.contains('.text-sm.font-bold.text-white', 'WH').trigger('mouseover');
    cy.contains('Logout').should('be.visible').click();
    cy.url({timeout:15000}).should('eq', 'http://localhost:3000/registration?screen=login');
  });
  
  Cypress.Commands.add('signUpStudent', (firstName, lastName, email, username, password, confirmPassword) => {
    cy.visitSignUpPhase1();
    cy.contains('button', 'Student').should('be.visible').click();
    cy.get('input[placeholder="First Name"]').type(firstName);
    cy.get('input[placeholder="Last Name"]').type(lastName);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm Password"]').type(confirmPassword);
    cy.contains('button', 'Create account').click();
  });
  
  Cypress.Commands.add('navigateToForgotPassword', () => {
    cy.visit('/registration?screen=login');
    cy.contains('Forgot Password').click();
    cy.url().should('include', '/ForgotPassword');
  });
  
  Cypress.Commands.add('enterEmailAndSubmit', (email) => {
    cy.get('input[placeholder="Enter your email address"]').type(email);
    cy.contains('button', 'Send Email').click();
  });
  
  Cypress.Commands.add('enterOTPAndSubmit', (otp) => {
    cy.get('input[placeholder="Enter the OTP"]').type(otp);
    cy.contains('button', 'Verify OTP').click();
  });
  
  Cypress.Commands.add('changePassword', (newPassword, confirmPassword) => {
    cy.get('input[placeholder="New Password"]').should('be.visible').type(newPassword);
    cy.get('input[placeholder="Confirm Password"]').should('be.visible').type(confirmPassword);
    cy.contains('button', 'Save').click();
  });