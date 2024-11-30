import React, { useState } from 'react'
import Greeting from './Greeting'
import pro from '../assets/images/profilepic.jpg'
import Welcome from './Welcome';
import FooterIn from './FooterIn';
import { Helmet } from 'react-helmet-async';
import ExploreCategory from './ExploreCategory';
import Explore from './Explore';
function Dashboard() {
  const [Opn, setOpn] = useState(false);
  function op() {
    setOpn(!Opn)
  }
  return (
    <>
      <Helmet><title>QuizSnap Dashboard</title></Helmet>
      <Greeting />
      <div className='flex flex-col justify-center items-center gap-20'>
        <Welcome />
        {/* <Explore /> */}
      </div>
      <FooterIn />
    </>
  )
}

export default Dashboard

