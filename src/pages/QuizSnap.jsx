import React from 'react'
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/QuizSnap/Navbar/Navbar'
import Home from '../components/QuizSnap/Home/Home'
import Intro from '../components/QuizSnap/Intro/Intro'
import AboutUs from '../components/QuizSnap/AboutUs/AboutUs'
import ContactUs from '../components/QuizSnap/ContactUs/ContactUs'
import Footer from '../components/QuizSnap/Footer/Footer'


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