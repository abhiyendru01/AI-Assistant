import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'

function AuthRoute({ children }) {
  const { userData } = useContext(userDataContext)

  if (userData) return <Navigate to="/" />

  return children
}

export default AuthRoute
