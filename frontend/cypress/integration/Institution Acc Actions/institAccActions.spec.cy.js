describe('Institution Account Tests', () => {
  const email = 'Tester@email.com';
  const password = '12345678';

  // Login before each test case
  beforeEach(() => {
    cy.login(email, password);
  });
  
  it('Goes to courses tab in profile and clicks create new courses button to navigate to course create page', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.get('.p-2.border-b.flex.items-center').click();
    cy.contains("My Courses").should('be.visible').click();
    cy.contains('button', 'Create new course').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1'); // Verify the URL
  });

  it('Navigate to first course page and ensure next button is not enabled till req fields filled', () => {
    cy.navigateToCreateCourse();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
  });

  it('Navigate to first course page and ensure next button is not enabled if I clear any typed field', () => {
    cy.navigateToCreateCourse();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').type("test desc");
    cy.get('input[placeholder="Set a title"]').clear();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').clear();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/1');
  });

  it('Navigate to 2nd course page and ensure next button is not enabled till a subject is picked', () => {
    cy.navigateToCreateCourse();
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').type("test desc");
    cy.contains('button','Next').should('be.visible').click();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/2');
  });

  it.only('Navigate to 2nd course page and ensure next button is not enabled when you pick and then delete subject', () => {
    cy.navigateToCreateCourse();
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').type("test desc");
    cy.contains('button','Next').should('be.visible').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]')
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});

    cy.get('.absolute.z-30').contains('Math').click();
    cy.contains('Math').should('be.visible').click();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/2');
  });

  it.only('Navigate to 3rd course page and ensure next button is not enabled when you do not put in obj', () => {
    cy.navigateToCreateCourse();
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').type("test desc");
    cy.contains('button','Next').should('be.visible').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]')
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});

    cy.get('.absolute.z-30').contains('Math').click();
    cy.contains('button','Next').should('be.visible').click();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
  });

  it.only('Navigate to 3rd course page and ensure next button is not enabled when type one obj and delete it', () => {
    cy.navigateToCreateCourse();
    cy.get('input[placeholder="Set a title"]').type("test title");
    cy.get('textarea[placeholder="Set a description"]').type("test desc");
    cy.contains('button','Next').should('be.visible').click();
    cy.get('svg.text-xl[viewBox="0 0 512 512"]')
    .find('path[d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"]')
    .click({force:true});

    cy.get('.absolute.z-30').contains('Math').click();
    cy.contains('button','Next').should('be.visible').click();
    
    cy.get('input[placeholder="Objective one"]').should('be.visible').type("testObjectives");
    cy.get('input[placeholder="Objective one"]').should('be.visible').clear();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
    cy.get('input[placeholder="Objective two"]').should('be.visible').type("testObjectives");
    cy.get('input[placeholder="Objective two"]').should('be.visible').clear();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
    cy.get('input[placeholder="Objective three"]').should('be.visible').type("testObjectives");
    cy.get('input[placeholder="Objective three"]').should('be.visible').clear();
    cy.contains('button','Next').should('be.visible').click();
    cy.url().should('include', '/create-new-course/3');
  });
  

  it('Create a new course to add and fill information', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    cy.deleteLatestCourse();
  });

  it('Create a new course to add and fill information, check if data is correct on course editor page', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemofacts', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('input[placeholder="Enter your course name"]').should('have.value', 'MathGemofacts');
    cy.get('textarea[placeholder="Enter your course description..."]').should('have.value', 'This is a math course of sorts.');
    cy.contains('Math').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Design').should('be.visible');
    cy.contains('IT').should('be.visible');
    cy.contains('Software').should('be.visible');
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });
    cy.contains("Objectives").should('be.visible').click();
    cy.get('input[placeholder="Objective 1"]').should('have.value', 'obj1');
    cy.get('input[placeholder="Objective 2"]').should('have.value', 'obj2');
    cy.get('input[placeholder="Objective 3"]').should('have.value', 'obj3');
    cy.deleteLatestCourse();
  });

  it('Create a new course to add and fill information, check if categories did not overflow', () => {
    cy.navigateToCreateCourse();
    cy.fillAddTooManySubjects('MathGemofacts', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('input[placeholder="Enter your course name"]').should('have.value', 'MathGemofacts');
    cy.get('textarea[placeholder="Enter your course description..."]').should('have.value', 'This is a math course of sorts.');
    cy.contains('Math').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Design').should('be.visible');
    cy.contains('IT').should('be.visible');
    cy.contains('Software').should('be.visible');
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });
    cy.contains("Objectives").should('be.visible').click();
    cy.get('input[placeholder="Objective 1"]').should('have.value', 'obj1');
    cy.get('input[placeholder="Objective 2"]').should('have.value', 'obj2');
    cy.get('input[placeholder="Objective 3"]').should('have.value', 'obj3');
    cy.deleteLatestCourse();
  });

  it('Create a new course to add and fill information, delete course categories on course final page', () => {
    cy.navigateToCreateCourse();
    cy.fillAddTooManySubjects('MathGemofacts', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('input[placeholder="Enter your course name"]').should('have.value', 'MathGemofacts');
    cy.get('textarea[placeholder="Enter your course description..."]').should('have.value', 'This is a math course of sorts.');
    cy.contains('Math').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Design').should('be.visible');
    cy.contains('IT').should('be.visible').click();
    cy.contains('Software').should('be.visible').click();
    cy.contains('IT').should('not.be.visible');
    cy.contains('Software').should('not.be.visible');
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });
    cy.contains("Objectives").should('be.visible').click();
    cy.get('input[placeholder="Objective 1"]').should('have.value', 'obj1');
    cy.get('input[placeholder="Objective 2"]').should('have.value', 'obj2');
    cy.get('input[placeholder="Objective 3"]').should('have.value', 'obj3');
    cy.deleteLatestCourse();
  });

  it('Create a new course to add and fill information, delete course categories on course final page', () => {
    cy.navigateToCreateCourse();
    cy.fillAddTooManySubjects('MathGemofacts', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('input[placeholder="Enter your course name"]').should('have.value', 'MathGemofacts');
    cy.get('textarea[placeholder="Enter your course description..."]').should('have.value', 'This is a math course of sorts.');
    cy.contains('Math').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Design').should('be.visible');
    cy.contains('IT').should('be.visible').click();
    cy.contains('Software').should('be.visible').click();
    cy.contains('IT').should('not.be.visible');
    cy.contains('Software').should('not.be.visible');
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });
    cy.contains("Objectives").should('be.visible').click();
    cy.get('input[placeholder="Objective 1"]').should('have.value', 'obj1');
    cy.get('input[placeholder="Objective 2"]').should('have.value', 'obj2');
    cy.get('input[placeholder="Objective 3"]').should('have.value', 'obj3');
    cy.deleteLatestCourse();
  });

  it('Create a new course to add and fill information, delete course categories on create course page 2', () => {
    cy.navigateToCreateCourse();
    
    cy.get('input[placeholder="Set a title"]').should('be.visible').type('MathGemofacts');
    cy.get('textarea[placeholder="Set a description"]').clear().type('This is a math course of sorts.');
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
  
    cy.contains('Math').should('be.visible');
    cy.contains('Science').should('be.visible');
    cy.contains('Design').should('be.visible');
    cy.contains('IT').should('be.visible').click();
    cy.contains('Software').should('be.visible').click();
    cy.contains('IT').should('not.be.visible');
    cy.contains('Software').should('not.be.visible');
    
    cy.deleteLatestCourse();
  });


  it('Create a new course to add and check does this display in the profile page', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('Mathtestfish233', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();
    cy.contains('Mathtestfish233').should('be.visible');
    cy.deleteLatestCourse();
  });

  it('Create a new course and navigate final course page through different tabs', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });
    cy.contains("Objectives").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/objectives/');
    cy.contains("Course programme").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/programme/');
    cy.contains("Prices").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/prices/');
  });

  it('Add a new class to course', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').should('be.visible');
    cy.wait(1000); 
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });

    cy.contains("Course programme").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/programme/');
    cy.get('svg.mr-4.opacity-1.lg\\:opacity-0').should('be.visible').click();
    cy.contains("Add a new class").should('be.visible').click();
    cy.contains("Your class title").should('be.visible').click();

    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(0).click().type("class name 1");
    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(1).click().type("description 1");
    cy.contains("File").should('be.visible').click();
    cy.get('input[type="file"]').attachFile('blank.pdf');
    cy.contains('button', 'Add an extra activity').should('be.visible').click();
    cy.contains("button", 'Save').should('be.visible').click();
    cy.scrollTo('top');
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').should('be.visible').click({ force: true });
    cy.contains("button", 'Save my changes').should('be.visible');
  });

  
  it('Add a new class to course and then delete it after saving', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').should('be.visible');
    cy.wait(1000); 
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });

    cy.contains("Course programme").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/programme/');
    cy.get('svg.mr-4.opacity-1.lg\\:opacity-0').should('be.visible').click();
    cy.contains("Add a new class").should('be.visible').click();
    cy.contains("Your class title").should('be.visible').click();

    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(0).click().type("class name 1");
    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(1).click().type("description 1");
    cy.contains("File").should('be.visible').click();
    cy.get('input[type="file"]').attachFile('blank.pdf');
    cy.contains('button', 'Add an extra activity').should('be.visible').click();
    cy.contains("button", 'Save').should('be.visible').click();
    cy.scrollTo('top');
    cy.contains("class name").click();
    cy.get('svg.text-lg[viewBox="0 0 512 512"]') 
    .find('path[d="M64 160l29.74 282.51A24 24 0 00117.61 464h276.78a24 24 0 0023.87-21.49L448 160zm248 217.46l-56-56-56 56L174.54 352l56-56-56-56L200 214.54l56 56 56-56L337.46 240l-56 56 56 56z"]') // Ensure this matches the exact path you need to click
    .click({force:true});
    cy.contains("class name").should('not.exist');
  });

  it('Add a new class to course and then delete it before saving', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').should('be.visible');
    cy.wait(1000); 
    cy.get('svg.text-xl[viewBox="0 0 1024 1024"]').click({ force: true });

    cy.contains("Course programme").should('be.visible').click();
    cy.url().should('include', 'profile/course-editor/programme/');
    cy.get('svg.mr-4.opacity-1.lg\\:opacity-0').should('be.visible').click();
    cy.contains("Add a new class").should('be.visible').click();
    cy.contains("Your class title").should('be.visible').click();

    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(0).click().type("class name 1");
    cy.get('textarea.focus\\:outline-none.text-sm.w-full.px-2.py-1').eq(1).click().type("description 1");
    cy.contains("File").should('be.visible').click();
    cy.get('input[type="file"]').attachFile('blank.pdf');
    cy.contains('button', 'Add an extra activity').should('be.visible').click();
    cy.scrollTo('top');
    cy.get('svg.text-lg[viewBox="0 0 512 512"]') 
    .find('path[d="M64 160l29.74 282.51A24 24 0 00117.61 464h276.78a24 24 0 0023.87-21.49L448 160zm248 217.46l-56-56-56 56L174.54 352l56-56-56-56L200 214.54l56 56 56-56L337.46 240l-56 56 56 56z"]') // Ensure this matches the exact path you need to click
    .click({force:true});
    cy.contains("Your class title").should('not.exist');
  });

  it('Pressing exit button till back at home course page', () => {
    cy.navigateToCreateCourse();
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.get('.arrow').trigger('mousedown', { which: 1 }).trigger('mousemove', { which: 1, clientX: 812 }).trigger('mouseup');
    cy.contains('button', 'Exit').should('be.visible').click();
    cy.contains('button', 'Exit').should('be.visible').click();
    cy.contains('button', 'Exit').should('be.visible').click();
    cy.contains('button', 'Exit').should('be.visible').click();
    cy.url().should('include', '/profile/my-courses');
  });

  it('Check visiting user courses profile page, and if correct data is visible', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('Course Name').should('be.visible');
    cy.contains('Students').should('be.visible');
    cy.contains('Ages').should('be.visible');
    cy.contains('State').should('be.visible');
    cy.contains('Options').should('be.visible');

    cy.contains('Math geom').should('be.visible');
    cy.contains('Advanced (16-19)').should('be.visible');
    cy.contains('Approved').should('be.visible');
  });

  it.only('Check visiting user courses profile page and click admin institution, go to educators page', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Educators').should('be.visible').click();
    cy.url().should('include', 'admin/educators');
    cy.contains('button','Invite Educators').should('be.visible').click();

    cy.url().should('include', 'admin/invite/educators');

  });

  it.only('Check visiting user courses profile page and click admin institution through student pages', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Students').should('be.visible').click();
    cy.url().should('include', 'admin/students');
    cy.contains('button','Invite students').should('be.visible').click();
    cy.url().should('include', 'admin/invite/students');

  });

  it.only('Check visiting user courses profile page and click admin institution through course pages', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Courses').should('be.visible').click();
    cy.url().should('include', 'admin/courses');
    cy.contains('button','Create new course').should('be.visible').click();
    cy.url().should('include', 'create-new-course/1');

  });

  it.only('Check visiting user courses profile page and click admin institution, create new course and check exists', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Courses').should('be.visible').click();
    cy.url().should('include', 'admin/courses');
    cy.contains('button','Create new course').should('be.visible').click();
    cy.url().should('include', 'create-new-course/1');
    cy.fillCourseDetails('MathGemoScience', 'This is a math course of sorts.', ['obj1', 'obj2', 'obj3']);
    cy.completeCourseCreation();
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();
    cy.contains("MathGemoScience").should('be.visible');
    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Courses').should('be.visible').click();
    cy.url().should('include', 'admin/courses');
    cy.contains("MathGemoScience").should('be.visible');
    cy.visit('/home')
    cy.deleteLatestCourse();
  });

  it.only('Check visiting user courses profile page and click admin institution, go to manage course and click edit', () => {
    cy.contains('.text-sm.font-bold.text-white', 'TE').trigger('mouseover');
    cy.contains('Profile').click();

    cy.url().should('include', 'user/courses');

    cy.contains('button','Admin Institution').should('be.visible').click();
    cy.url().should('include', 'admin');
    cy.contains('Manage Courses').should('be.visible').click();
    cy.url().should('include', 'admin/courses');
  cy.contains('td', 'test') 
  .parent() 
  .find('button') 
  .first() 
  .click(); 
  });
});
