const email = 'Tester@email.com';
const password = '12345678';

// Login before each test case
beforeEach(() => {
  cy.login(email, password);
});

it('Should login properly with an existing institution account', () => {
  cy.url().should('eq', 'http://localhost:3000/');
});

it('Should be able to click course card at home page window and navigate to course page', () => {
  cy.navigateToCreateCourse();
  cy.fillCourseDetails('Math', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
  cy.completeCourseCreation();
  cy.visit('/home');

  cy.wait(15000);
  cy.contains('Math').should('be.visible').click();
  cy.url().should('include', '/course?id='); 
  cy.deleteLatestCourse();
});

it('Hover over profile, drop down menu pops and select email box successfully navigating to courses page', () => {
  cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
  cy.get('.p-2.border-b.flex.items-center').click();
  cy.url().should('include', '/profile/courses'); 
});

it('Goes to courses tab in profile', () => {
  cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
  cy.get('.p-2.border-b.flex.items-center').click();
  cy.contains("My Courses").should('be.visible').click();
  cy.url().should('include', '/profile/my-courses'); // Verify the URL
});

it('Navigate multiple tabs from courses home, my courses and games', () => {
  cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
  cy.get('.p-2.border-b.flex.items-center').click();
  cy.contains("My Courses").should('be.visible').click();
  cy.url().should('include', '/profile/my-courses'); 
  cy.contains("Courses").should('be.visible').click();
  cy.url().should('include', '/profile/courses'); 
  cy.contains("Games").should('be.visible').click();
  cy.url().should('include', '/profile/games'); 
});

it('Navigate to the profile settings page', () => {
  cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
  cy.get('.p-2.border-b.flex.items-center').click();
  cy.get('svg.mx-2.cursor-pointer').click();
  cy.url().should('include', '/profile/profile-settings'); 
});

it('Check visiting user courses profile page, visiting other options on page and going back to home page', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');
    cy.contains('Notifications').click();
    cy.url().should('include', '/user/notifications');
    cy.contains('Settings').click();
    cy.url().should('include', '/user/settings');
    cy.get('img[src="/static/media/lotusletters.f33840dd4dec67c02a4f.webp"]').click();
  });