import Container from '../../components/Container/Container';
import CourseParts from '../../components/CourseParts/CourseParts';
import ExternalLink from '../../components/Link/ExternalLink';
import ProjectTools from '../../components/ProjectTools/ProjectTools';

const HomePage = () => {
  return (
    <Container>
      <h1>Welcome,</h1>
      <p>
        My name is Anthony Collins and this is my final submission for the{' '}
        <ExternalLink href="https://fullstackopen.com/en/about/">full stack course</ExternalLink> held at the Department
        of Computer Science at the University of Helsinki. My aim for this project was to consolidate everything I have
        learned from each one of the 14 parts of the course. Feel free to check out the{' '}
        <ExternalLink href="https://github.com/Anthony-Phillip-Collins/fullstack-docker-pern">source code</ExternalLink>{' '}
        and run the project locally. If you would like to find out more about me please visit{' '}
        <ExternalLink href="https://anthonycollins.net">https://anthonycollins.net</ExternalLink>.
      </p>

      <h2>Tools used for this project</h2>
      <ProjectTools />

      <h2>Course parts</h2>
      <p>These are my individual submissions for each part of the course:</p>
      <CourseParts />
    </Container>
  );
};

export default HomePage;
