import { UserLogin } from '../../src/types/user.type';

const user: UserLogin = { username: 'user@foobar.com', password: 'letmein' };
const user2: UserLogin = { username: 'user2@foobar.com', password: 'letmein' };

const url = '/';

beforeEach(() => {
  cy.visit(url);
});

afterEach(function onAfterEach() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop();
  }
});

describe('Blog App', () => {
  it('should show login form', () => {
    cy.showLoginForm();
  });

  it('should log in', () => {
    cy.showLoginForm();
    cy.login(user);
    cy.contains('Logged in.');
    cy.getUserWithToken().then((ls) => {
      expect(ls).to.have.property('accessToken');
    });
  });

  it('should show error message on login failure', () => {
    cy.showLoginForm();
    cy.login(user2);
    cy.contains('Invalid username or password.');
  });

  it('should log out', () => {
    cy.showLoginForm();
    cy.login(user);
    cy.get('[data-testid=logout-button]').click();
    cy.contains('Logged out.');
    cy.getUserWithToken().then((ls) => {
      expect(ls).to.not.have.property('accessToken');
    });
  });
});
