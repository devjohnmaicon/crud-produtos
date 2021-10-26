import React from 'react';

export default function ProdutosTable(props) {
  return (
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
        {props.produtos?.map((produto, index) => {
          return (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.sku}</td>
              <td>{produto.descricao}</td>
              <td>{produto.preco}</td>
              <td>{produto.fornecedor}</td>
              <td>
                <button
                  onClick={props.editar(produto.sku)}
                  className="btn btn-primary mx-2"
                >
                  Editar
                </button>
                <button
                  onClick={props.remover(produto.sku)}
                  className="btn btn-danger "
                >
                  Remover
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
