
import React,{useState} from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Buffer } from 'buffer'
window.Buffer = Buffer;



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
