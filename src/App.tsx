import { ThemeProvider } from 'styled-components';
import BlogContainer from './components/Blogs/BlogContainer';
import PageHeader from './components/PageHeader/PageHeader';
import { GlobalStyle } from './styles/global';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageHeader />
      <main>
        <BlogContainer />
      </main>
    </ThemeProvider>
  );
}

export default App;
