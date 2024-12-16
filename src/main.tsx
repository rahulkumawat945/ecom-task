import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Products from './pages/Products.tsx'
import Header from './components/layouts/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Products />
  </StrictMode>,
)
