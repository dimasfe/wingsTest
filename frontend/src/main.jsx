import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import CSS
import "./styles/css/ads.css";
// import "./styles/css/bs5.css";
import "./styles/css/Login.css";
import "./styles/css/Register.css";
import "./styles/css/Dashboard.css";
import "./styles/css/LoadingIndicator.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

