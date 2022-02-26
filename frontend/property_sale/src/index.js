import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { PopupContextProvider } from './context/PopupContext';

ReactDOM.render(
  <React.StrictMode>
      <PopupContextProvider>
        <AuthContextProvider>
              <App />
        </AuthContextProvider>
      </PopupContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
