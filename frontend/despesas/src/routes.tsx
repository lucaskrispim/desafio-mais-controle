import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/home';
import Despesas from './pages/despesas';
import DespesasForm from './pages/despesas/form'

const Routes: React.FC = () => {
  return <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/despesas" exact component={Despesas}/> 
    <Route path="/despesas_cadastro" exact component={DespesasForm}/> 
    <Route path="/despesas_cadastro/:id" exact component={DespesasForm}/> 
  </Switch>;
} 

export default Routes;