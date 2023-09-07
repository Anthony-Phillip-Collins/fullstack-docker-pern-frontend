import ExternalLink from '../Link/ExternalLink';
import StyledProjectTools from './ProjectTools.styled';

const tools = [
  {
    name: 'React',
    logo: 'logo-react.png',
    link: 'https://reactjs.org/',
  },
  {
    name: 'React Router',
    logo: 'logo-react-router.png',
    link: 'https://reactrouter.com/',
  },
  {
    name: 'Redux Toolkit',
    logo: 'logo-redux.png',
    link: 'https://redux-toolkit.js.org/',
  },
  {
    name: 'TypeScript',
    logo: 'logo-typescript.png',
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Express',
    logo: 'logo-express.png',
    link: 'https://expressjs.com/',
  },
  {
    name: 'PostgreSQL',
    logo: 'logo-postgres.png',
    link: 'https://www.postgresql.org/',
  },
  {
    name: 'Redis',
    logo: 'logo-redis.png',
    link: 'https://redis.io/',
  },
  {
    name: 'Sequelize',
    logo: 'logo-sequelize.png',
    link: 'https://sequelize.org/',
  },
  {
    name: 'Cypress',
    logo: 'logo-cypress.png',
    link: 'https://www.cypress.io/',
  },
  {
    name: 'Jest',
    logo: 'logo-jest.png',
    link: 'https://jestjs.io/',
  },
  {
    name: 'ESLint',
    logo: 'logo-eslint.png',
    link: 'https://eslint.org/',
  },
  {
    name: 'Prettier',
    logo: 'logo-prettier.png',
    link: 'https://prettier.io/',
  },
  {
    name: 'Docker',
    logo: 'logo-docker.png',
    link: 'https://www.docker.com/',
  },
  {
    name: 'Heroku',
    logo: 'logo-heroku.png',
    link: 'https://www.heroku.com/',
  },
  {
    name: 'Github Actions',
    logo: 'logo-github-actions.png',
    link: 'https://github.com/features/actions',
  },
];

const ProjectTools = () => (
  <StyledProjectTools.List>
    {tools.map((tool) => (
      <StyledProjectTools.Item key={tool.name}>
        <StyledProjectTools.Logo src={`/img/${tool.logo}`} alt={tool.name} />
        <ExternalLink href={tool.link}>
          <span>{tool.name}</span>
        </ExternalLink>
      </StyledProjectTools.Item>
    ))}
  </StyledProjectTools.List>
);

export default ProjectTools;
