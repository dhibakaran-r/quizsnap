import React from 'react'
import { isAuthenticated } from '../service/Auth'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  return isAuthenticated ? children : <Navigate to={'/login'} />
}

export default PrivateRoute