import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import { userDataContext } from './context/UserContext'

function App() {
  const { userData } = useContext(userDataContext)

  return (
    <Routes>
      {/* 🏠 Home - requires assistant setup */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {(userData?.assistantImage && userData?.assistantName)
              ? <Home />
              : <Navigate to="/customize" />}
          </ProtectedRoute>
        }
      />

      {/* 🔒 Auth Routes */}
      <Route
        path="/signin"
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        }
      />

      {/* 👤 Customize */}
      <Route
        path="/customize"
        element={
          <ProtectedRoute>
            <Customize />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customize2"
        element={
          <ProtectedRoute>
            <Customize2 />
          </ProtectedRoute>
        }
      />

      {/* Optional: Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
