import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NoteContextProvider } from './context/Context.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <NoteContextProvider>
       <App /> 
    </NoteContextProvider>
    </ BrowserRouter>
  </React.StrictMode>,
)
