import { Blog as BlogType } from '../../types/blog.type';
import Blog from './Blog';
import classNames from 'classnames/bind';
import styles from './Blogs.module.css';

const cx = classNames.bind(styles);

interface Props {
  data: BlogType[];
  isLoading: boolean;
  isError?: boolean;
}

const BlogList = ({ data, isLoading, isError = false }: Props) => {
  if (isError) return <div>Something went wrong, check the console...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Blogs</h1>
      <div className={cx('blogList')}>
        {data.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
