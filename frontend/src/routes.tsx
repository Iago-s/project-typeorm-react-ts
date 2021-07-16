import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';

const Routes: React.FC = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/tasks" exact component={Tasks}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;