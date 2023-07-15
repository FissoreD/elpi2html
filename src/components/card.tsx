import { Card as C, Col, Row } from 'react-bootstrap';
import Dispatch from './dispatch';
import { CardType } from './types';
import { useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Card({ title, cnt }: CardType) {
  return (
    <ResizableBox width={496} height={367} style={{padding:0, margin:"1em"}} >
      <C border="primary overflow-auto h-100">
        <C.Header>{title}</C.Header>
        <C.Body className="my-auto">
          <Row className="h-100">
            <div className="my-auto">
              <Dispatch {...cnt} />
            </div>
          </Row>
        </C.Body>
      </C>
      </ResizableBox>
  )
}

export default Card;
