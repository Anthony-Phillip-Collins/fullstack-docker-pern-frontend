import { ThemeProvider } from 'styled-components';
import BlogsContainer from './components/Blogs/BlogsContainer';
import LoginForm from './components/LoginForm/LoginForm';
import PageHeader from './components/PageHeader/PageHeader';
import { GlobalStyle } from './styles/global';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageHeader />
      <main>
        <LoginForm />
        <BlogsContainer />
      </main>
    </ThemeProvider>
  );
};

export default App;
