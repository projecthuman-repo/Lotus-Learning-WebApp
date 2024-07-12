
beforeEach(() => {
  const email = 'Tester@email.com';
  const password = '12345678';
/*
  const courseData = {
    title: "Math",
    compleated: false,
    accepted: false,
    description: "python",
    categories: ["Programming", "Computer Science", "Python"],
    age: "18+",
    creator: {
      username: "tester",
      code: "INST001",
      institutionName: "Tech University",
      email: "Tester@mail.com",
      accountType: "admin"
    }  
  }
 */

    cy.login(email, password);
   // cy.createCourse(courseData);
   cy.navigateToCreateCourse();
    cy.fillCourseDetails('Math', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    cy.visit('/home');
  
});
describe('Course Page See More Functionality', () => {
    it('should check if see more and see less buttons work for course description', () => {

        cy.visit('/registration?screen=login');
        // Enter email
       
        cy.get('input[placeholder="Email"]').type('Tester@email.com');
        // Enter password
        cy.get('input[type="password"]').type('12345678');
        // Click the login button
        cy.contains('button', 'Login').click();
    
        // Verify that the user is redirected to the right page
        cy.url().should('eq', 'http://localhost:3000/');
    
      cy.contains("Math").should('be.visible').click();
   
      // Verify that the description is initially truncated
      cy.contains('div', 'Description').within(() => {
        // Verify that the description container has the class 'fadeout_bottom'
        cy.get('.fadeout_bottom').should('exist');
  
        // Verify that the "See more" link is visible within the correct element
        cy.contains('See more').should('be.visible');
  
        // Click the "See more" link to expand the description within the correct element
        cy.contains('See more').click();
  
        // Verify that the full description is displayed
        cy.contains('See less').should('be.visible');
  
        // Verify that the description container no longer has the class 'fadeout_bottom'
        cy.get('.fadeout_bottom').should('not.exist');
        cy.contains('See less').should('be.visible').click();
        cy.get('.fadeout_bottom').should('exist');
      });

      cy.contains('div', 'Course Creator').within(() => {
        // Verify that the description container has the class 'fadeout_bottom'
        cy.get('.fadeout_bottom').should('exist');
  
        // Verify that the "See more" link is visible within the correct element
        cy.contains('See more').should('be.visible');
  
        // Click the "See more" link to expand the description within the correct element
        cy.contains('See more').click();
  
        // Verify that the full description is displayed
        cy.contains('See less').should('be.visible');
  
        // Verify that the description container no longer has the class 'fadeout_bottom'
        cy.get('.fadeout_bottom').should('not.exist');
        cy.contains('See less').should('be.visible').click();
        cy.get('.fadeout_bottom').should('exist');
      });
    });
  });

  it('should check if pop-up window appears', () => {

  cy.visit('/registration?screen=login');
  // Enter email
 
  cy.get('input[placeholder="Email"]').type('Tester@email.com');
  // Enter password
  cy.get('input[type="password"]').type('12345678');
  // Click the login button
  cy.contains('button', 'Login').click();

  // Verify that the user is redirected to the right page
  cy.url().should('eq', 'http://localhost:3000/');

cy.contains("Math").should('be.visible').click();
cy.scrollTo('bottom');
cy.get('.p-2.border-b.hover\\:bg-stone-50.cursor-pointer').eq(0).should('be.visible').click();
cy.get('.w-\\[800px\\].md\\:h-\\[550px\\].h-\\[700px\\].bg-white.rounded-md.border.flex.md\\:flex-row.flex-col').should('be.visible');
cy.get('body').click(0, 0); 
cy.get('.w-\\[800px\\].md\\:h-\\[550px\\].h-\\[700px\\].bg-white.rounded-md.border.flex.md\\:flex-row.flex-col').should('not.exist');
  });
  
  afterEach(() => {
    cy.deleteLatestCourse();
    
    });
