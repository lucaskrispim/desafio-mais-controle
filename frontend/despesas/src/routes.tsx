import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/home';
import Despesas from './pages/despesas';
import DespesasForm from './pages/despesas/form'

import Obras from './pages/obras';
import ObrasForm from './pages/obras/form'

const Routes: React.FC = () => {
  return <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/despesas" exact component={Despesas}/> 
    <Route path="/despesas_cadastro" exact component={DespesasForm}/> 
    <Route path="/despesas_cadastro/:id" exact component={DespesasForm}/> 

    <Route path="/obras" exact component={Obras}/> 
    <Route path="/obras_cadastro" exact component={ObrasForm}/> 
    <Route path="/obras_cadastro/:id" exact component={ObrasForm}/> 

  </Switch>;
} 

export default Routes;