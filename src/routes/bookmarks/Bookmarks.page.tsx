import { getBookmarksOfAuthUser } from '../../app/features/blog.slice';
import { useAppSelector } from '../../app/hooks';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import PageTitle from '../../components/PageTitle/PageTitle';

const BookmarksPage = () => {
  const data = useAppSelector((state) => getBookmarksOfAuthUser(state));

  // Handle if user is not logged in
  if (!data) return null;

  return (
    <Container>
      <PageTitle title="Bookmarks"></PageTitle>
      <BlogList data={data} />
    </Container>
  );
};

export default BookmarksPage;
