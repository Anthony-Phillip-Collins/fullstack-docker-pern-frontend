import { useEffect, useState } from 'react';
import { Blog } from '../types/blog.type';
import blogService from '../services/blog.service';

const useBlogs = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setData(blogs);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchBlogs();
  }, []);

  return { data, isLoading, isError };
};

export default useBlogs;
