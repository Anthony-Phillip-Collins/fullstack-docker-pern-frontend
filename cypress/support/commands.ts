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

Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('[data-testid=login-form]').as('loginForm');
  cy.get('@loginForm').find('[data-testid=username]').type(username);
  cy.get('@loginForm').find('[data-testid=password]').type(password);
  cy.get('@loginForm').find('[type=submit]').click();
});

Cypress.Commands.add('showLoginForm', () => {
  cy.get('[data-testid=login-expand-button]').click();
});

Cypress.Commands.add('getUserWithToken', () => {
  const baseUrl = Cypress.config('baseUrl');
  cy.getAllLocalStorage().then((ls) => {
    const entry = ls[baseUrl];
    if (!entry) {
      return {};
    }
    const token = entry.blogsAppUser;
    return JSON.parse(token.toString());
  });
});
