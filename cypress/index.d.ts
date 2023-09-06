import { UserAttributes, UserCreateInput, UserLogin, UserWithToken } from '../src/types/user.type';

interface CypressRunner {
  stop(): void;
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(credentials: UserLogin): Chainable<void>;
      loginWithoutSession(credentials: UserLogin): Chainable<void>;
      loginAsAdmin(url?: string): Chainable<void>;
      loginAsUser(url?: string): Chainable<void>;
      logout(): Chainable<void>;
      getUserWithToken(): Chainable<UserWithToken>;
      createUser(data: UserCreateInput): Chainable<void>;
      persistUser(): Chainable<void>;
      getUser(): Chainable<UserAttributes>;
      cleanupUsers(): Chainable<void>;
      cleanupBlogs(): Chainable<void>;
    }

    interface Cypress {
      runner: CypressRunner;
    }
  }
}
