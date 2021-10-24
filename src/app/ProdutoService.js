const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(errors) {
  this.errors = errors;
}

export default class ProdutoService {
  buscarProdutos = () => {
    const produtos = localStorage.getItem(PRODUTOS);
    return JSON.parse(produtos);
  };

  validar = (produto) => {
    let errorList = [];

    if (produto.nome === '') {
      errorList.push('O campo NOME é obrigatório!');
    }

    if (produto.sku === '') {
      errorList.push('O campo SKU é obrigatório!');
    }
    if (produto.descricao === '') {
      errorList.push('O campo DESCRIÇÃO é obrigatóriO!');
    }
    if (produto.preco === '' || produto.preco <= 0) {
      errorList.push('O campo PREÇO é inválido!');
    }
    if (produto.fornecedor === '') {
      errorList.push('O campo FORNECEDOR é obrigatório!');
    }

    if (errorList.length > 0) {
      throw new ErroValidacao(errorList);
    }
  };

  verificaUpdate(sku) {
    let index = null;
    this.buscarProdutos().forEach((produto, i) => {
      if (produto.sku === sku) {
        index = i;
      }
    });

    return index;
  }

  salvar = (produto) => {
    this.validar(produto);

    let produtos = localStorage.getItem(PRODUTOS);

    if (!produtos) {
      produtos = [];
    } else {
      produtos = JSON.parse(produtos);
    }

    const indexDoProduto = this.verificaUpdate(produto.sku);
    indexDoProduto === null
      ? produtos.push(produto)
      : (produtos[indexDoProduto] = produto);

    localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
  };
}
