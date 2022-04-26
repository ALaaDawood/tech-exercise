import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { UserListingPage } from '../../page-objects/user-listing.page';

const userListingPage = new UserListingPage();

beforeEach(()=> {
  cy.intercept('https://randomuser.me/api/*').as('usersAPI');
});

When('user navigates to users screen', () => {
  userListingPage.visit();
});

Then('randomuser API should be called', () => {
  cy.wait('@usersAPI').its('response.statusCode').should('equal', 200);
});

Then('users list should be visible', () => {
  userListingPage.usersTable.should('be.visible');
});
