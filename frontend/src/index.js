import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Router from './router';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Your backend GraphQL endpoint
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // ReactDOM.render(

  //     <App />

  //   document.getElementById('root')
);
