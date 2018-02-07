import React from 'react';
import { Route, IndexRoute, browserHistory} from 'react-router';
// containers
import App from './components/App/';
import Landing from './components/Landing/';

// components

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Landing } />
  </Route>
);
