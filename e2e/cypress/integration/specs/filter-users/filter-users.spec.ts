import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { UserListingPage } from '../../page-objects/user-listing.page';
const userListingPage = new UserListingPage();

beforeEach(()=> {
  cy.intercept('https://randomuser.me/api/*').as('usersAPI');
});

Given('user navigates to users listing screen', () => {
  userListingPage.visit();
});

When('user chooses gender {string}', (gender: string) => {
  if (gender === 'male') {
    userListingPage.chooseMaleRadioButton();
  } else {
    userListingPage.chooseFemaleRadioButton();
  }
});

When('user clicks Filter Users button', () => {
  userListingPage.clickFilterButton();
  cy.wait('@usersAPI');
  cy.wait(1000);
});

When('user selects {string} from nationality dropdown', (nationality: string) => {
  userListingPage.selectNationality(nationality);
});

Then('users list gender column will include {string} only', (gender: string) => {
  userListingPage.genderColumn.each($col => {
    expect($col.text()).to.equal(gender)
  });
});

Then('users list location column will include {string} only', (country: string) => {
  userListingPage.locationColumn.each($col => {
    expect($col.text()).to.contain(country)
  });
});