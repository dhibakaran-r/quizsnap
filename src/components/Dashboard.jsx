import React, { useState } from 'react'
import Greeting from './Greeting'
import pro from '../assets/images/profilepic.jpg'
import Welcome from './Welcome';
import FooterIn from './FooterIn';
import { Helmet } from 'react-helmet-async';
function Dashboard() {
  const [Opn, setOpn] = useState(false);
  function op() {
    setOpn(!Opn)
  }
  return (
    <>
      <Helmet><title>QuizSnap Dashboard</title></Helmet>
      <Greeting />
      <div className='flex justify-center items-center'>
        <Welcome />
      </div>
      <FooterIn />
    </>
  )
}

export default Dashboard

