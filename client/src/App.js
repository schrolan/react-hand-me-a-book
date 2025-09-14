import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Auth from './utils/auth'

import Search from './pages/search'
import User from './pages/user'
import Login from './pages/login'
import SignUp from './pages/signUp'

import Screen from './components/screen'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Container from './components/container'
import Footer from './components/footer'

import { ThemeProvider } from './ctx/themeContext'

import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = createHttpLink({
  uri: 'http://3.144.161.54:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Container>
          <Screen>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
            <Sidebar>
            </Sidebar>
          </Screen>
          </Container>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

