import React from 'react';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Cambia esto según la configuración del Docker
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);

export default ApolloProvider;
