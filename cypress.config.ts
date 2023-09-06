import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
  dotenv.config({ path: '.env.secret' });
}

let user = '';

export default defineConfig({
  env: {
    API_URL: process.env.API_BASE_URL,
    ADMIN_PROD_PASSWORD: process.env.ADMIN_PROD_PASSWORD,
    USER_PROD_PASSWORD: process.env.USER_PROD_PASSWORD,
  },
  e2e: {
    baseUrl: process.env.NODE_ENV === 'local' ? 'http://localhost:8080' : 'http://localhost:4173',
    setupNodeEvents(on, config) {
      on('task', {
        log(args) {
          console.log(...args);
          return null;
        },
        setUser: (val) => (user = val),
        getUser: () => user,
      });
    },
  },
});
