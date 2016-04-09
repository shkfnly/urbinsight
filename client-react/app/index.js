import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, useRouterHistory} from 'react-router';
import { createHashHistory, createHistory, useBasename } from 'history'
const apphistory = createHashHistory({queryKey: false})
const otherhistory = useBasename(createHistory)({
  basename: '/'
})
import routes from './config/routes';
import Main from './src/components/Main';


ReactDOM.render(
<Router history={otherhistory}>{routes}</Router>,
  document.getElementById('app')
)
