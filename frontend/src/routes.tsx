import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Detail from './pages/Detail';
import TasksForm from './pages/Tasks/TasksForm';
import Header from './components/Header';

const Routes: React.FC = () => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/tasks" exact component={Tasks}/>
        <Route path="/tasks/:id" component={Detail}/>
        <Route path="/tasks_actions/:id" exact component={TasksForm}/>
        <Route path="/tasks_actions" exact component={TasksForm}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;