import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Overview from './Overview';

export default function App({ data }) {
  return (
    <Router>
      <div>
        <Route to="/login" component={Login} />
        <Route to="/app" component={Overview} />
      </div>
    </Router>
  );
}
