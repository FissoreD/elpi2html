// import React, { useState } from 'react';
import { Card as C } from 'react-bootstrap';
import Clause from './elpi/clause';

function Card(p: any) {
  var p1 = p.p;
  return (
    <div>
      <C border="primary">
        <C.Header>{p1.title}</C.Header>
        <C.Body><Clause p={p1.cnt} /></C.Body>
      </C>
    </div >
  )
}

export default Card;