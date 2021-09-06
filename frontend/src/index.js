import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.hydrate(
  <BrowserRouter>
    <App drafts={window._draftData} />
  </BrowserRouter>,
  document.getElementById('root'),
);
