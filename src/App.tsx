import BlogContainer from './components/Blogs/BlogContainer';
import blogService from './services/blog.service';

function App() {
  console.log(import.meta.env);

  const f = async () => {
    const blogs = await blogService.getAll();
    console.log(blogs);
  };

  f();

  return <BlogContainer />;
}

export default App;
