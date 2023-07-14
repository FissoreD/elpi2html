import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/style.css';
import reportWebVitals from './reportWebVitals';
import Card from './components/card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import X from './tests/test.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

var pos = 0
var pos2 = pos + 4
var X1 = X.clauses//.slice(pos, pos2)

root.render(
  <React.StrictMode>
    {
      X1.map((x, pos) => <Card key={pos} {...x} />)
    }
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
