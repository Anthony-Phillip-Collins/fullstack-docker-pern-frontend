import { Blog } from '../../types/blog.type';
import classNames from 'classnames/bind';
import styles from './Blogs.module.css';

const cx = classNames.bind(styles);

interface Props {
  blog: Blog;
}

const Blog = ({ blog }: Props) => {
  return (
    <div className={cx('blog')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <h2>{blog.title}</h2>
        </div>
        <div className={cx('body')}>
          <h3>{blog.author}</h3>
          <p>{blog.likes}</p>
          <p className={cx('url')}>{blog.url}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
