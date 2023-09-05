const blogsSlug = '/blogs';

beforeEach(() => {
  cy.visit(blogsSlug);
});

afterEach(function onAfterEach() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop();
  }
});

describe('Blogs', () => {
  describe('Create', () => {
    it('should allow creating blogs when logged in', () => {
      cy.get('[data-testid=blog]').filter(':contains("Test Blog")').should('not.exist');
      Cypress.session.clearAllSavedSessions();
      cy.loginAsAdmin(blogsSlug);

      cy.get('[aria-label="Add blog"]').click();
      cy.get('[data-testid="blog-form"]').as('form').should('exist');
      cy.get('@form').find('[name="title"]').type('Test Blog');
      cy.get('@form').find('[name="author"]').type('Test Author');
      cy.get('@form').find('[name="url"]').type('http://www.foobar.com');
      cy.get('@form').find('[type="submit"]').click();
      cy.contains('Blog Test Blog created');
    });
  });

  describe('Read', () => {
    it('should show at least one blog on blogs page', () => {
      cy.get('[data-testid=blog]').should('exist');
      cy.contains('by');
      cy.contains('likes');
      cy.contains('owner:');
      cy.contains('created:').should('not.exist');
      cy.contains('updated:').should('not.exist');
    });

    it('should show blog details on blog page', () => {
      cy.get('[data-testid=blog] [aria-label="Read more"]').as('readMore');
      cy.get('@readMore').first().click();
      cy.contains('by');
      cy.contains('likes');
      cy.contains('owner:');
      cy.contains('created:');
      cy.contains('updated:');
    });
  });

  describe('Update', () => {
    it('should be able to add and remove bookmarks when logged in', () => {
      cy.loginAsAdmin(blogsSlug);

      cy.get('[data-testid=blog]').filter(':contains("Test Blog")').as('blog');
      cy.get('@blog').find('[aria-label="Add bookmark"]').as('addBookmark');
      cy.get('@addBookmark').click();
      cy.contains('Test Blog added to your bookmarks');

      cy.visit('/bookmarks');
      cy.get('[data-testid=blog]').filter(':contains("Test Blog")');

      cy.visit(blogsSlug);
      cy.get('@blog').find('[aria-label="Remove bookmark"]').as('removeBookmark').should('exist');
      cy.get('@removeBookmark').click();
      cy.contains('Test Blog removed from your bookmarks');

      cy.visit('/bookmarks');
      cy.contains('Test Blog').should('not.exist');
    });

    it('should not allow bookmarking when not logged in', () => {
      cy.get('[data-testid=blog] [aria-label="Add bookmark"]').as('addBookmark');
      cy.get('@addBookmark').first().click();
      cy.contains('You need to be logged in to bookmark a blog.');
    });

    it('should to edit blogs that are owned', () => {
      cy.get('[data-testid=blog]').filter(':contains("Test Blog")').as('blog').should('exist');
      cy.loginAsAdmin(blogsSlug);

      cy.get('@blog').find('[aria-label=Edit]').click();
      cy.get('@blog').find('[data-testid="blog-heading"]').as('heading');
      cy.get('@heading').then((heading) => {
        heading.empty();
        cy.wrap(heading).type('Test Blog Updated');
        cy.get('@blog').find('[aria-label="Save"]').click();
        cy.contains('Test Blog Updated saved');
        cy.get('@heading').contains('Test Blog Updated');
      });
    });
  });

  describe('Delete', () => {
    it('should be able to delete blogs that are owned', () => {
      cy.get('[data-testid=blog]').filter(':contains("Test Blog Updated")').as('blog').should('exist');
      cy.loginAsAdmin(blogsSlug);
      cy.get('@blog').find('[aria-label=Edit]').click();
      cy.get('@blog').find('[aria-label="Delete"]').click();
      cy.get('@blog').find('[aria-label="Confirm"]').click();
      cy.contains('Test Blog Updated deleted');
      cy.get('[data-testid=blog]').filter(':contains("Test Blog Updated")').should('not.exist');
    });
  });
});
