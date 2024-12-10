import React from 'react'
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Intro from '../components/Intro'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'


function QShome() {

  return (

    <div className='w-full flex flex-col justify-center items-center'>
      <Helmet><title>QuizSnap</title></Helmet>
      <Navbar />
      <Home />
      <Intro />
      <AboutUs />
      <ContactUs />
      <Footer />

    </div>

  )
}

const QuizSnap = React.memo(QShome);

export default QuizSnap