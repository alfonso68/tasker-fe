import React from 'react';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);

export default ApolloProvider;
