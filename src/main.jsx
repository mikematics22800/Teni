import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './style.css'
import UserLayout from './components/UserLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Support from './pages/Support.jsx'
import Restaurants from './pages/Restaurants.jsx'
import Hotels from './pages/Hotels.jsx'
import Flights from './pages/Flights.jsx'
import Reset from './pages/Reset.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route
          path=":id"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />}/>
          <Route path="restaurants" element={<Restaurants />}/>
          <Route path="hotels" element={<Hotels />}/>
          <Route path="flights" element={<Flights />}/>
          <Route path="support" element={<Support/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
