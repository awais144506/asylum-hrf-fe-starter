import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProvideAppContext>
      <App />
    </ProvideAppContext>
  </React.StrictMode>
);
