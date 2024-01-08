import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Bookkeeping from './pages/Bookkeeping'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Bookkeeping />
  </React.StrictMode>
)
