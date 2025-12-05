import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Board from './pages/Board'
import Whiteboard from './pages/Whiteboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boards/:id" element={<Board />} />
        <Route
          path="/whiteboard-demo"
          element={<Whiteboard onBack={() => window.history.back()} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
