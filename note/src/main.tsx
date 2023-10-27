import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NoteContextProvider } from './context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NoteContextProvider>
       <App /> 
    </NoteContextProvider>
  </React.StrictMode>,
)
