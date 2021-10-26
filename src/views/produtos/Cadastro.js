import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProdutoService from '../../app/ProdutoService';

const stateInitial = {
  nome: '',
  sku: '',
  descricao: '',
  preco: '',
  fornecedor: '',
  errors: [],
  atualizando: false,
};

class CadastroProduto extends React.Component {
  state = stateInitial;

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const produto = {
      nome: this.state.nome,
      sku: this.state.sku,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: this.state.fornecedor,
    };
    try {
      this.service.salvar(produto);
      this.limpaDados();
      this.setState({ message: true });
    } catch (e) {
      const errors = e.errors;
      this.setState({ errors: errors });
    }
  };

  limpaDados = () => {
    this.setState({
      nome: '',
      sku: '',
      descricao: '',
      preco: '',
      fornecedor: '',
      message: false,
    });
  };

  componentDidMount() {
    const { sku } = this.props.match.params;
    if (sku) {
      const resultado = this.service
        .buscarProdutos()
        .filter((produto) => produto.sku === sku);

      if (resultado.length === 1) {
        const produtoEncontrado = resultado[0];
        this.setState({ ...produtoEncontrado, atualizando: true });
      }
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header fs-2">
          {this.state.atualizando ? 'Editar Produto' : 'Cadastrar Produto'}
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            {this.state.message && (
              <div className="alert alert-dismissible alert-success">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  onClick={() => this.setState({ message: false })}
                ></button>
                <strong>Produto cadastrado com sucesso !</strong>
              </div>
            )}
            {this.state.errors.length > 0 &&
              this.state.errors.map((msg, index) => {
                return (
                  <div
                    key={index}
                    className="alert alert-dismissible alert-danger"
                  >
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                    ></button>
                    <strong>Erro! </strong>
                    {msg}
                  </div>
                );
              })}
            <div className="row ">
              <div className="col-md-6">
                <div className="form-group ">
                  <label>Nome: *</label>
                  <input
                    name="nome"
                    type="text"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.nome}
                  />
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="form-group">
                  <label>SKU: *</label>
                  <input
                    name="sku"
                    type="text"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.sku}
                    disabled={this.state.atualizando}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    name="descricao"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.descricao}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    name="preco"
                    type="text"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.preco}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Fornecedor</label>
                  <input
                    name="fornecedor"
                    type="text"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.fornecedor}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-1 gap-2 mt-3 d-flex">
                <button type="submit" className="btn btn-success">
                  {this.state.atualizando ? 'Editar' : 'Salvar'}
                </button>

                {this.state.atualizando ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/consulta-produtos">Cancelar</Link>
                  </div>
                ) : (
                  <button onClick={this.limpaDados} className="btn btn-primary">
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CadastroProduto);
