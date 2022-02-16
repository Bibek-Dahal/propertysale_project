import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { PopupContextProvider } from './context/PopupContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PopupContextProvider>
          <App />
      </PopupContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
