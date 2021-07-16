import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Header from './components/Header';

const Routes: React.FC = () => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/tasks" exact component={Tasks}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;