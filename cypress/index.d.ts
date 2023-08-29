import { UserLogin, UserWithToken } from '../src/types/user.type';

interface CypressRunner {
  stop(): void;
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(credentials: UserLogin): Chainable<void>;
      showLoginForm(): Chainable<void>;
      getUserWithToken(): Chainable<UserWithToken>;
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
    }

    interface Cypress {
      runner: CypressRunner;
    }
  }
}
