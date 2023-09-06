import { BlogAttributes } from '../../src/types/blog.type';
import { UserAttributes, UserLogin } from '../../src/types/user.type';

Cypress.Commands.overwrite('log', function (log, ...args) {
  if (Cypress.browser.isHeadless) {
    return cy.task('log', args, { log: false }).then(() => {
      return log(...args);
    });
  } else {
    console.log(...args);
    return log(...args);
  }
});

Cypress.Commands.add('loginWithoutSession', ({ username, password }) => {
  cy.get('[data-testid=login-expand-button]').click();
  cy.get('[data-testid=login-form]').as('loginForm');
  cy.get('@loginForm').find('[data-testid=username]').type(username);
  cy.get('@loginForm').find('[data-testid=password]').type(password);
  cy.get('@loginForm').find('[type=submit]').click();
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/');
      cy.loginWithoutSession({ username, password });
    },
    {
      validate() {
        cy.contains('Logged in');

        cy.getUserWithToken().then((ls) => {
          expect(ls).to.have.property('accessToken');
          expect(ls).to.have.property('username', username);
        });

        cy.persistUser();

        cy.getUser().then((user: UserAttributes) => {
          expect(user).to.not.be.null;
        });
      },
    },
  );
});

Cypress.Commands.add('loginAsAdmin', (url) => {
  cy.getAdminCredentials().then((credentials: UserLogin) => {
    cy.login(credentials);
    cy.visit(url || '/');
  });

  cy.getUser().then((user: UserAttributes) => {
    expect(user).to.not.be.null;
    expect(user.admin).to.be.true;
  });
});

Cypress.Commands.add('loginAsUser', (url) => {
  cy.getUserCredentials().then((credentials: UserLogin) => {
    cy.login(credentials);
    cy.visit(url || '/');
  });

  cy.getUser().then((user: UserAttributes) => {
    expect(user).to.not.be.null;
    expect(user.admin).to.be.false;
  });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/');
  cy.get('[data-testid=logout-button]').click();
  cy.task('setUser', null);
  Cypress.session.clearAllSavedSessions();
});

Cypress.Commands.add('getUser', () => cy.task('getUser'));

Cypress.Commands.add('persistUser', () => {
  cy.getUserWithToken().then((ls) => {
    expect(ls).to.have.property('accessToken');
    cy.request('GET', `${Cypress.env('API_URL')}/users/${ls.id}`).then((res) => {
      cy.task('setUser', res.body);
    });
  });
});

Cypress.Commands.add('getUserWithToken', () => {
  const baseUrl = Cypress.config('baseUrl');
  cy.getAllLocalStorage().then((ls) => {
    return new Promise((resolve) => {
      const entry = ls[baseUrl];
      if (!entry) {
        resolve({});
      } else {
        const token = entry.blogsAppUser;
        const parsed = JSON.parse(token.toString());
        resolve(parsed);
      }
    });
  });
});

Cypress.Commands.add('cleanupUsers', () => {
  cy.getAdminCredentials().then((credentials: UserLogin) => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, credentials).then((res) => {
      const { accessToken } = res.body;
      cy.request('GET', `${Cypress.env('API_URL')}/users`).then((res) => {
        const users: UserAttributes[] = res.body;
        cy.fixture('credentials/test.json').then((credentials: UserLogin) => {
          const testUser = users.find((user) => user.username === credentials.username);
          if (testUser) {
            cy.request({
              method: 'DELETE',
              url: `${Cypress.env('API_URL')}/users/${testUser.username}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
        });
      });
    });
  });
});

Cypress.Commands.add('cleanupBlogs', () => {
  cy.getAdminCredentials().then((credentials: UserLogin) => {
    cy.request('POST', `${Cypress.env('API_URL')}/auth/login`, credentials).then((res) => {
      const { accessToken } = res.body;
      cy.request('GET', `${Cypress.env('API_URL')}/blogs`).then((res) => {
        const blogs = res.body;
        cy.fixture('blogs/test.json').then(({ title }: BlogAttributes) => {
          const testBlogs: BlogAttributes[] = blogs.filter((blog) => blog.title.includes(title));
          testBlogs.forEach((blog) => {
            cy.request({
              method: 'DELETE',
              url: `${Cypress.env('API_URL')}/blogs/${blog.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          });
        });
      });
    });
  });
});

Cypress.Commands.add('getAdminCredentials', () => {
  cy.fixture('credentials/admin.json').then((credentials: UserLogin) => {
    credentials.password = Cypress.env('ADMIN_PROD_PASSWORD') || credentials.password;
    return credentials;
  });
});

Cypress.Commands.add('getUserCredentials', () => {
  cy.fixture('credentials/user.json').then((credentials: UserLogin) => {
    credentials.password = Cypress.env('USER_PROD_PASSWORD') || credentials.password;
    return credentials;
  });
});
