import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
