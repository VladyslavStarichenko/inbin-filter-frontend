import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../src/providers/AuthProvider';
import AdminContextProvider from '../src/providers/AdminProvider';
import ResidentContextProdiver from '../src/providers/ResidentProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AdminContextProvider>
        <ResidentContextProdiver>
          <Router>
            <App />
          </Router>
        </ResidentContextProdiver>
      </AdminContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
