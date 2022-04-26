export class UserListingPage {
    private _url ='/';
    private _pageElementsSelectors = {
        usersTable : '[data-cy="users-table"]'
    };

    visit(): void {
        cy.visit(this._url);
    }

    get usersTable(){
        return cy.get(this._pageElementsSelectors.usersTable);
    }
}