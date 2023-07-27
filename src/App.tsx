import { ThemeProvider } from 'styled-components';
import BlogListContainer from './components/BlogList/BlogListContainer';
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
        <BlogListContainer />
      </main>
    </ThemeProvider>
  );
};

export default App;
