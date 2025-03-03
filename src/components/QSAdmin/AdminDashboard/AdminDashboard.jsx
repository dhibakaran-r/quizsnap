import React from 'react'
import Greeting from '../../Greeting'
import AdminCard from '../AdminCard/AdminCard'
import Welcome from '../../Welcome'
import FooterIn from '../../FooterIn'
import { Helmet } from 'react-helmet-async'
import Explore from '../../Explore'

function AdminDashboard() {
  return (
    <>
      <Helmet><title>QuizSnap Dashboard</title></Helmet>
      <Greeting />
      <Welcome />
      <AdminCard />
      <Explore />
      <FooterIn />
    </>
  )
}

export default AdminDashboard