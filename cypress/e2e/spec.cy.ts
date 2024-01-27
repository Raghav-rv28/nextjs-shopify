//Authentication Tests

describe('Sign Up', () => {
  it('user should be able to Sign Up', () => {
    cy.visit('/sign-up', {
      failOnStatusCode: false
    });
    cy.get('input[id="firstName"]').type('Test');
    cy.get('input[id="lastName"]').type('Two');
    // fill in the form
    cy.get('input[type="email"]').type('gegnedulmu@gufum.com');
    cy.get('input[type="password"]').type('gegnedulmu');

    // submit the form
    cy.get('button').contains('Login').click();
  });
});

// describe('login', () => {
//   it('user should be able to log in', () => {
//     cy.visit('/sign-in', {
//       failOnStatusCode: false
//     });

//     // open the login modal
//     cy.get('button').contains('Login').click();

//     // fill in the form
//     cy.get('input[type="email"]').type('fahoco4281@konican.com');
//     cy.get('input[type="password"]').type('fahoco4281');

//     // submit the form
//     cy.get('button').contains('Login').click();
//   });
// });
