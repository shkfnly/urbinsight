import React from 'react';
import Main from '../src/components/Main';
import GLMap from '../src/components/GLMap';
import LoginModal from '../src/components/Login';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

export default (
  <Route path="/" component={Main}>
      <IndexRoute component={GLMap} />  
  </Route>
)
