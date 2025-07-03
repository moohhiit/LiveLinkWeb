import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'
import { SocketProvider } from './Context/SocketContext.jsx'
import { MessgaeProvider } from './Context/MessageContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <MessgaeProvider>
          <App />
          </MessgaeProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
