import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/:id" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
