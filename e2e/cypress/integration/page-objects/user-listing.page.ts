export class UserListingPage {
    private _url = '/';
    private _pageElementsSelectors = {
        usersTable: '[data-cy="users-table"]',
        maleRadioButton: '[data-cy="male-radio-button"]',
        femaleRadioButton: '[data-cy="female-radio-button"]',
        filterUsersButton: '[data-cy="filter-users-button"]',
        nationalitySelectField: '[data-cy="nationality-select-field"]',
        genderColumn: '.gender-column',
        locationColumn: '.location-column'
    };

    visit(): void {
        cy.visit(this._url);
    }

    get usersTable() {
        return cy.get(this._pageElementsSelectors.usersTable);
    }

    get genderColumn() {
        return cy.get(this._pageElementsSelectors.genderColumn);
    }

    get locationColumn() {
        return cy.get(this._pageElementsSelectors.locationColumn);
    }

    clickFilterButton(): void {
        cy.get(this._pageElementsSelectors.filterUsersButton).click();
    }

    chooseMaleRadioButton(): void {
        cy.get(this._pageElementsSelectors.maleRadioButton).click();
    }

    chooseFemaleRadioButton(): void {
        cy.get(this._pageElementsSelectors.femaleRadioButton).click();
    }

    selectNationality(nationality: string): void {
        cy.get(this._pageElementsSelectors.nationalitySelectField).click();
        cy.get('mat-option').contains(nationality).click();
    }
}