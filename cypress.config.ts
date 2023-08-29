import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.NODE_ENV === 'local' ? 'http://localhost:8080' : 'http://localhost:4173',
    setupNodeEvents(on, config) {
      on('task', {
        log(args) {
          console.log(...args);
          return null;
        },
      });
    },
  },
});
