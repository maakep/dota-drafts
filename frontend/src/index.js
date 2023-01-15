import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './app.jsx';
import { BrowserRouter } from 'react-router-dom';

const rt = createRoot(document.getElementById('root'));

rt.render(
  <BrowserRouter>
    <App drafts={window._draftData} />
  </BrowserRouter>,
);

// const root = hydrateRoot(
//   document.getElementById('root'),
//   <BrowserRouter>
//     <App drafts={window._draftData} />
//   </BrowserRouter>,
// );
