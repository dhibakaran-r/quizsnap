import React from 'react'
import Greeting from './Greeting'
import AdminCard from './AdminCard'
import Welcome from './Welcome'

function AdminDashboard() {
  return (
    <>
        <Greeting />
        <Welcome />
        <AdminCard />
    </>
  )
}

export default AdminDashboard