import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodosProvider } from './store/todos.tsx'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <TodosProvider>
    <App/>
   </TodosProvider>
    </BrowserRouter>
   
   
  </StrictMode>,
)
