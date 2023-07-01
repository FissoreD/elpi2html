// import React, { useState } from 'react';
import { Card as C } from 'react-bootstrap';
import Clause from './elpi/clause';
import { useRef } from 'react';

var cardHook: HTMLElement;

var startX: number, startY: number, startWidth: number, startHeight: number;

function initDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  let p = cardHook!;
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView!.getComputedStyle(p).width, 10);
  startHeight = parseInt(document.defaultView!.getComputedStyle(p).height, 10);
  document.documentElement.addEventListener('mousemove', doDrag, false);
  document.documentElement.addEventListener('mouseup', stopDrag, false);
}

const doDrag = (e: MouseEvent) => {
  let p = cardHook!
  p.style.width = (startWidth + e.clientX - startX) + 'px';
  p.style.height = (startHeight + e.clientY - startY) + 'px';
}

const stopDrag = (e: MouseEvent) => {
  console.log("Removed??")
  document.documentElement.removeEventListener('mousemove', doDrag, false);
  document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

function Card(p: any) {
  var p1 = p.p;
  const hiddenDivRef = useRef<HTMLDivElement>(null);

  let card =
    <C border="primary resizable" ref={hiddenDivRef}>
      <C.Header>{p1.title}</C.Header>
      <C.Body><Clause p={p1.cnt} /></C.Body>
      <div className='resizer' onMouseDown={e => { cardHook = hiddenDivRef.current!; initDrag(e) }}></div>
    </C>
  return (
    <div>
      {card}
    </div >
  )
}

export default Card;
