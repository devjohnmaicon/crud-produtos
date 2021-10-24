import React from 'react';
import { withRouter } from 'react-router-dom';
import ProdutoService from '../../app/ProdutoService';

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

  render() {
    return (
      <div className="card">
        <div className="card-header fs-2">Consulta de Produtos</div>

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Fornecedor</th>
              </tr>
            </thead>
            <tbody>
              {this.state.produtos.map((produto, index) => {
                return (
                  <tr key={index}>
                    <td>{produto.nome}</td>
                    <td>{produto.sku}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.fornecedor}</td>
                    <td>
                      <button
                        onClick={() => this.editarProduto(produto.sku)}
                        className="btn btn-primary mx-2"
                      >
                        Editar
                      </button>
                      <button className="btn btn-danger ">Remover</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ConsultaProdutos);
