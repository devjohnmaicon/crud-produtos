import React from 'react';
import { withRouter } from 'react-router-dom';
import ProdutoService from '../../app/ProdutoService';
import Card from '../../components/Card';
import ProdutosTable from './ProdutosTable';

class ConsultaProdutos extends React.Component {
  state = {
    produtos: [],
  };

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  componentDidMount() {
    const produtos = this.service.buscarProdutos();
    this.setState({ produtos });
  }

  editarProduto = (sku) => {
    this.props.history.push(`/cadastro-produtos/${sku}`);
  };

  removerProduto = (sku) => {
    const produtos = this.service.remover(sku);
    this.setState({ produtos });
  };

  render() {
    return (
      <Card header="Consulta de Produtos">
        <ProdutosTable
          produtos={this.state.produtos}
          editar={() => this.editarProduto}
          remover={() => this.removerProduto}
        />
      </Card>
    );
  }
}

export default withRouter(ConsultaProdutos);
