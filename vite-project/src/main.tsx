import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ProtectContextProvider} from '../src/context/Protect'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProtectContextProvider>
      <App />
    </ProtectContextProvider>
  </React.StrictMode>,
)
