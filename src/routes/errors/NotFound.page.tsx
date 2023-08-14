import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { parseFrontendError } from '../../util/frontendErrorParser';

type Props = {
  error?: Error | string;
};

const NotFoundPage = ({ error }: Props) => {
  const message = parseFrontendError(error)?.message;
  return <ErrorComponent title={`404 - ${message || 'Nothing to see here...'}`} />;
};

export default NotFoundPage;
