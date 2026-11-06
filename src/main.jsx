import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap CSS only — JS was removed; navbar/collapse are React-controlled.
// Full CSS removal would require rewriting grid/navbar utilities site-wide.
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
