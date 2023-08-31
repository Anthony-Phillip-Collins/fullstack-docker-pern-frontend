import { defineConfig } from 'cypress';

let user = '';

export default defineConfig({
  env: {
    API_URL:
      process.env.NODE_ENV === 'local'
        ? 'http://localhost:8080/api'
        : 'https://fullstack-docker-pern-backend-800d35caffaa.herokuapp.com/api',
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
