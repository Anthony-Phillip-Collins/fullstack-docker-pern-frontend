import { useEffect } from 'react';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import PageTitle from '../../components/PageTitle/PageTitle';
import useReadings from '../../hooks/useReadings';

const BookmarksPage = () => {
  const { data, refetch } = useReadings();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) return null;

  return (
    <Container>
      <PageTitle title="Bookmarks"></PageTitle>
      {data.length === 0 && <p>No blogs have been bookmarked.</p>}
      <BlogList data={data} />
    </Container>
  );
};

export default BookmarksPage;
