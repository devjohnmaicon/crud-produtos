import React from 'react';

export default function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Bem vindo!</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Cadastrar
        </a>
      </p>
    </div>
  );
}
