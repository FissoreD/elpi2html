import { Card as C } from 'react-bootstrap';
import { useRef } from 'react';
import Dispatch from './dispatch';
import { CardType } from './types';

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
  document.documentElement.removeEventListener('mousemove', doDrag, false);
  document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

function Card({ title, cnt}: CardType) {
  const hiddenDivRef = useRef<HTMLDivElement>(null);
  return (
      <div>
        <C border="primary resizable overflow-auto" ref={hiddenDivRef}>
          <C.Header>{title}</C.Header>
          <C.Body><Dispatch {...cnt} /></C.Body>
          <div className='resizer' onMouseDown={e => { cardHook = hiddenDivRef.current!; initDrag(e) }}></div>
        </C>
      </div>
  )
}

export default Card;
