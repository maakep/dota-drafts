import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app.jsx';

const root = hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App drafts={window._draftData} />
  </BrowserRouter>,
);

// root.render(
//   <BrowserRouter>
//     <App drafts={window._draftData} />
//   </BrowserRouter>,
// );
