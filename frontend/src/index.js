import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import './index.css';

const client = new ApolloClient({
  dataIdFromObject: o => `${o.__typename}:${o.id}`
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
