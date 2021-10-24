import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import CadastroProduto from './views/produtos/Cadastro';
import ConsultaProdutos from './views/produtos/Consulta';

export default function Rotas() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cadastro-produtos/:sku?" component={CadastroProduto} />
      <Route path="/consulta-produtos" component={ConsultaProdutos} />
    </Switch>
  );
}
