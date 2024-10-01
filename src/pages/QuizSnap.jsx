import React, { Suspense, useEffect } from 'react'
import { BallTriangle, Circles, Triangle } from 'react-loader-spinner';
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Intro from '../components/Intro'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'


function QuizSnap() {

  useEffect(() => {
    console.log('welcome');
    
  })

  return (
     
        <div className='flex flex-col justify-center items-center'>

            <Navbar />
            <Home />
            <Intro />
            <AboutUs />
            <ContactUs />
            <Footer />
          
        </div>
    
  )
}

export default QuizSnap