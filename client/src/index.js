import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ApolloProvider>
);