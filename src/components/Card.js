import React from 'react';

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header fs-2">{props.header}</div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}
