import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import 'semantic-ui-css/semantic.css';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = localStorage.getItem('JWT');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    req.options.headers.accept = 'application/json';
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
