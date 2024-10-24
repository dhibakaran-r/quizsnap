import React from 'react'
import Greeting from './Greeting'
import AdminCard from './AdminCard'
import Welcome from './Welcome'
import FooterIn from './FooterIn'
import { Helmet } from 'react-helmet-async'

function AdminDashboard() {
  return (
    <>
      <Helmet><title>QuizSnap Dashboard</title></Helmet>
      <Greeting />
      <Welcome />
      <AdminCard />
      <FooterIn />
    </>
  )
}

export default AdminDashboard