import { UserLogin } from '../../src/types/user.type';

const usersSlug = '/users';

before(() => {
  cy.cleanupUsers();
  Cypress.session.clearAllSavedSessions();
});

beforeEach(() => {
  cy.visit(usersSlug);
});

afterEach(function onAfterEach() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop();
  }
});

describe('Users', () => {
  describe('Create', () => {
    it('should be able to create users when logged in as admin', () => {
      cy.loginAsAdmin(usersSlug);
      cy.fixture('credentials/test.json').then((credentials: UserLogin) => {
        const username = 'Test User';
        cy.get('[data-testid="user"]').filter(':contains("Test User")').should('not.exist');
        cy.get('[aria-label="Add user"]').click();
        cy.get('[data-testid="user-form"]').as('form').should('exist');
        cy.get('@form').find('[name="username"]').type(credentials.username);
        cy.get('@form').find('[name="password"]').type('letmein');
        cy.get('@form').find('[name="name"]').type(username);
        cy.get('@form').find('[type="submit"]').click();
        cy.contains(`User ${username} created`);
      });
    });

    it('should not be able to create user with and existing username', () => {
      cy.loginAsAdmin(usersSlug);
      cy.get('[aria-label="Add user"]').click();
      cy.get('[data-testid="user-form"]').as('form').should('exist');
      cy.get('@form').find('[name="username"]').type('admin@foobar.com');
      cy.get('@form').find('[name="password"]').type('letmein');
      cy.get('@form').find('[name="name"]').type('Test User');
      cy.get('@form').find('[type="submit"]').click();
      cy.contains('User already exists');
    });

    it('should not be able to create users when logged in as user', () => {
      cy.loginAsUser(usersSlug);
      cy.get('[aria-label="Add user"]').should('not.exist');
    });
  });

  describe('Read', () => {
    it('should show admin', () => {
      cy.contains('admin@foobar.com');
      cy.get('[data-testid="user"] [aria-label="Read more"]');
      cy.contains('Blogs:').should('not.exist');
      cy.contains('Readings:').should('not.exist');
    });

    it('should show user details on user page', () => {
      cy.get('[data-testid="user"] [aria-label="Read more"]').first().click();
      cy.contains('Id:');
      cy.contains('Created:');
      cy.contains('Updated:');
      cy.contains('Blogs:');
      cy.contains('Readings:');
    });
  });

  describe('Update', () => {
    it('should be able to edit users when logged in as admin', () => {
      cy.loginAsAdmin(usersSlug);
      cy.fixture('credentials/test.json').then((credentials: UserLogin) => {
        cy.get('[data-testid="user"]').filter(':contains("Test User")').as('testUser').should('exist');
        cy.get('@testUser').find('[aria-label=Edit]').click();
        cy.get('@testUser').find('[data-testid="user-heading"]').as('heading');
        cy.get('@heading').then((heading) => {
          heading.empty();
          cy.wrap(heading).type('Test User Updated');
          cy.get('@testUser').find('[aria-label="Save"]').click();
          cy.contains(`${credentials.username} saved`);
          cy.get('@heading').contains('Test User Updated');
        });
      });
    });
  });

  describe('Delete', () => {
    it('should be able to delete users when logged in as admin', () => {
      cy.loginAsAdmin(usersSlug);
      cy.get('[data-testid="user"]').filter(':contains("Test User Updated")').as('testUser').should('exist');
      cy.get('@testUser').find('[aria-label=Edit]').click();
      cy.get('@testUser').find('[aria-label="Delete"]').click();
      cy.get('@testUser').find('[aria-label="Confirm"]').click();
      cy.get('@testUser').should('not.exist');
      cy.contains('Test User Updated deleted');
    });
  });
});
