import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './config/routes';
import Main from './src/components/Main';

ReactDOM.render(
<Router history={browserHistory}>{routes}</Router>,
  document.getElementById('app')
)
