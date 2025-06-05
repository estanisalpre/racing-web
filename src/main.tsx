import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent.tsx'
import App from './App.tsx'
import './styles/app.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeaderComponent/>
        <App />
    </BrowserRouter>
  </StrictMode>
)