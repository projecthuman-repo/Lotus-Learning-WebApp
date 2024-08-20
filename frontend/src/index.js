import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Router from './router';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

//redux 
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GoogleOAuthProvider } from "@react-oauth/google";


// const client = new ApolloClient({
//   uri: 'http://52.14.4.146:5000/graphql', // Your backend GraphQL endpoint
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ApolloProvider client={client}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="689689573550-agn1nvas4qbvpf4ijj9mqf9dfad91a7d.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  // </ApolloProvider>
  // ReactDOM.render(

  //     <App />

  //   document.getElementById('root')
);
