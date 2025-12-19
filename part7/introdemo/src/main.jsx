import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import NoteApp from './NoteApp.jsx'
import CounterApp from './CounterApp.jsx'
import FormApp from './FormApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <nav>
        <Link to="/">Notes</Link>{' '}
        <Link to="/counter">Counter</Link>
        <Link to="/form">Form</Link>
      </nav>

      <Routes>
        <Route path="/*" element={<NoteApp />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/form" element={<FormApp />} />
      </Routes>
    </Router>
  </StrictMode>,
)
