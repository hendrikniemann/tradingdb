import React from 'react';
import { BrowserRouter as Router, Match } from 'react-router';

import Login from './Login';
import Overview from './Overview';

export default function App({ data }) {
  return (
    <Router>
      <div>
        <Match pattern="/login" component={Login} />
        <Match pattern="/app" component={Overview} />
      </div>
    </Router>
  );
}
