import { BlogAttributes } from '../../src/types/blog.type';

const blogsSlug = '/blogs';
let newTitle: string;

before(() => {
  cy.cleanupBlogs();
  Cypress.session.clearAllSavedSessions();
});

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
      cy.loginAsAdmin(blogsSlug);
      cy.fixture('blogs/test.json').then(({ title, author, url }: BlogAttributes) => {
        cy.get('[data-testid=blog]').filter(`:contains("${title}")`).should('not.exist');
        cy.get('[aria-label="Add blog"]').click();
        cy.get('[data-testid="blog-form"]').as('form').should('exist');
        cy.get('@form').find('[name="title"]').type(title);
        cy.get('@form').find('[name="author"]').type(author);
        cy.get('@form').find('[name="url"]').type(url);
        cy.get('@form').find('[type="submit"]').click();
        cy.contains('Blog Test Blog created');
      });
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
    it('should allow adding and removing bookmarks when logged in', () => {
      cy.loginAsAdmin(blogsSlug);

      cy.fixture('blogs/test.json').then(({ title }: BlogAttributes) => {
        cy.get('[data-testid=blog]').filter(`:contains("${title}")`).as('blog');
        cy.get('@blog').find('[aria-label="Add bookmark"]').as('addBookmark');
        cy.get('@addBookmark').click();
        cy.contains(`${title} added to your bookmarks`);
        cy.get('@blog').find('[aria-label="Add bookmark"]').should('not.exist');

        cy.visit('/bookmarks');
        cy.get('[data-testid=blog]').filter(`:contains("${title}")`);

        cy.visit(blogsSlug);
        cy.get('@blog').find('[aria-label="Remove bookmark"]').as('removeBookmark').should('exist');
        cy.get('@removeBookmark').click();
        cy.contains(`${title} removed from your bookmarks`);
        cy.get('@blog').find('[aria-label="Remove bookmark"]').should('not.exist');
        cy.get('@blog').find('[aria-label="Add bookmark"]').should('exist');

        cy.visit('/bookmarks');
        cy.contains(title).should('not.exist');
      });
    });

    it('should not allow bookmarking when not logged in', () => {
      cy.get('[data-testid=blog] [aria-label="Add bookmark"]').as('addBookmark');
      cy.get('@addBookmark').first().click();
      cy.contains('You need to be logged in to bookmark a blog.');
    });

    it('should to edit blogs that are owned', () => {
      cy.fixture('blogs/test.json').then(({ title }: BlogAttributes) => {
        cy.get('[data-testid=blog]').filter(`:contains("${title}")`).as('blog').should('exist');
        cy.loginAsAdmin(blogsSlug);
        cy.get('@blog').find('[aria-label=Edit]').click();
        cy.get('@blog').find('[data-testid="blog-heading"]').as('heading');
        cy.get('@heading').then((heading) => {
          heading.empty();
          newTitle = `${title} Updated`;
          cy.wrap(heading).type(newTitle);
          cy.get('@blog').find('[aria-label="Save"]').click();
          cy.contains(`${newTitle} saved`);
          cy.get('@heading').contains(newTitle);
        });
      });
    });

    it('should allow liking blogs when logged in', () => {
      cy.loginAsAdmin(blogsSlug);
      cy.fixture('blogs/test.json').then(({ title }: BlogAttributes) => {
        cy.get('[data-testid=blog]').filter(`:contains("${title}")`).as('blog').should('exist');
        cy.get('@blog').find('[data-testid=likes]').as('likes').should('exist');
        cy.get('@likes').contains('0');

        cy.get('@blog').find('[aria-label="Add like"]').as('addLike').click();
        cy.contains(`Added like to ${title}`);
        cy.get('@likes').contains('1');
        cy.get('@addLike').should('not.exist');
        cy.get('@blog').find('[aria-label="Remove like"]').as('removeLike').should('exist');

        cy.get('@removeLike').click();
        cy.contains(`Removed like from ${title}`);
        cy.get('@likes').contains('0');
        cy.get('@removeLike').should('not.exist');
        cy.get('@blog').find('[aria-label="Add like"]').as('addLike').should('exist');
      });
    });
  });

  describe('Delete', () => {
    it('should be able to delete blogs that are owned', () => {
      cy.get('[data-testid=blog]').filter(`:contains("${newTitle}")`).as('blog').should('exist');
      cy.loginAsAdmin(blogsSlug);
      cy.get('@blog').find('[aria-label=Edit]').click();
      cy.get('@blog').find('[aria-label="Delete"]').click();
      cy.get('@blog').find('[aria-label="Confirm"]').click();
      cy.contains(`${newTitle} deleted`);
      cy.get('[data-testid=blog]').filter(`:contains("${newTitle}")`).should('not.exist');
    });
  });
});
