import React from 'react'
import { checkAdmin, isAuthenticated } from '../service/Auth'
import { Navigate, Outlet } from 'react-router-dom'

function AccessRoute() {
  if (isAuthenticated) {

    return checkAdmin() ? <Outlet /> : <Navigate to={'/unauthorized'} />

  }
}

export default AccessRoute