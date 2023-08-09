import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

type Props = {
  error?: string;
};

const NotFoundPage = ({ error }: Props) => {
  return <ErrorComponent title={`404 - ${error || 'Nothing to see here...'}`} />;
};

export default NotFoundPage;
