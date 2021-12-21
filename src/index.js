// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

// Providers
import AuthProvider from '../src/providers/AuthProvider';
import AdminContextProvider from '../src/providers/AdminProvider';
import ResidentContextProdiver from '../src/providers/ResidentProvider';
import CleanerContextProdiver from '../src/providers/CleanerProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AdminContextProvider>
        <ResidentContextProdiver>
          <CleanerContextProdiver>
            <Router>
              <App />
            </Router>
          </CleanerContextProdiver>
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
