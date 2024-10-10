import React, { useState } from 'react'
import Greeting from './Greeting'
import pro from '../assets/images/profilepic.jpg'
import Welcome from './Welcome';
function Dashboard() {
  const [Opn, setOpn] = useState(false);
  function op(){
    setOpn(!Opn)
  }
  return (
    <>
      <Greeting />
      <Welcome />

    </>
  )
}

export default Dashboard

