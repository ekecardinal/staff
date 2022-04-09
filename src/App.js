import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
