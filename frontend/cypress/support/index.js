

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific Axios errors
    if (err.message.includes('Request aborted')) {
      return false; // Prevent Cypress from failing the test
    }
  
   
    return false;
  });