import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="452763953268-6fngfs59va55615pbt6rmrkbdgd5g196.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);