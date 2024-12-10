import React from 'react'
import Greeting from './Greeting'
import Welcome from './Welcome';
import FooterIn from './FooterIn';
import { Helmet } from 'react-helmet-async';
import Explore from './Explore';
function Dashboard() {

  return (
    <>
      <Helmet><title>QuizSnap Dashboard</title></Helmet>
      <Greeting />
      <div className='flex flex-col justify-center items-center gap-20'>
        <Welcome />
        <Explore />
      </div>
      <FooterIn />
    </>
  )
}

export default Dashboard

