import { UserLogin } from '../../src/types/user.type';

beforeEach(() => {
  cy.visit('/');
});

afterEach(function onAfterEach() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop();
  }
});

describe('Auth', () => {
  it('should log in as user', () => {
    Cypress.session.clearAllSavedSessions();
    cy.loginAsUser();
  });

  it('should log in as admin', () => {
    cy.loginAsAdmin();
  });

  it('should log out', () => {
    cy.loginAsAdmin();
    cy.logout();
    cy.visit('/');
    cy.get('[data-testid=login-expand-button]').should('exist');

    cy.getUserWithToken().then((ls) => {
      expect(ls).to.not.have.property('accessToken');
    });

    cy.getUser().then((user) => {
      expect(user).to.be.null;
    });
  });

  it('should not log in with invalid credentials', () => {
    cy.fixture('credentials/fail.json').then((credentials: UserLogin) => {
      cy.loginWithoutSession(credentials);
      cy.contains('Invalid username or password.');
    });
  });
});
