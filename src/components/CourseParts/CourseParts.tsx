import ExternalLink from '../Link/ExternalLink';
import CoursePartsStyled from './CourseParts.styled';

const parts = [
  {
    id: 0,
    title: 'Fundamentals of Web apps',
    link: 'https://github.com/Anthony-Phillip-Collins/fso/tree/master/Part%200',
  },
  {
    id: 1,
    title: 'Introduction to React',
    link: 'https://github.com/Anthony-Phillip-Collins/fso/tree/master/part1',
  },
  {
    id: 2,
    title: 'Communicating with server',
    link: 'https://github.com/Anthony-Phillip-Collins/fso/tree/master/part2',
  },
  {
    id: 3,
    title: 'Programming a server with NodeJS and Express',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part3',
  },
  {
    id: 4,
    title: 'Testing Express servers, user administration',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part4',
  },
  {
    id: 5,
    title: 'Testing React apps',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part5',
  },
  {
    id: 6,
    title: 'Advanced state management',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part6',
  },
  {
    id: 7,
    title: 'React router, custom hooks, styling app with CSS and webpack',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part7',
  },
  {
    id: 8,
    title: 'GraphQL',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part8',
  },
  {
    id: 9,
    title: 'TypeScript',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part9',
  },
  {
    id: 10,
    title: 'React Native',
    link: 'https://github.com/Anthony-Phillip-Collins/fso-part10',
  },
  {
    id: 11,
    title: 'CI/CD',
    link: 'https://github.com/Anthony-Phillip-Collins/full-stack-open-pokedex',
  },
  {
    id: 12,
    title: 'Containers',
    link: 'https://github.com/Anthony-Phillip-Collins/patientor-docker',
  },
  {
    id: 13,
    title: 'Using relational databases',
    link: 'https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern',
  },
];

const CourseParts = () => (
  <CoursePartsStyled>
    {parts.map(({ id, title, link }) => (
      <li key={id}>
        <ExternalLink href={link}>
          Part{id} - {title}
        </ExternalLink>
      </li>
    ))}
  </CoursePartsStyled>
);

export default CourseParts;
