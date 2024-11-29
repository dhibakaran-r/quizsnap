import React from 'react'
import { Route, Routes } from 'react-router-dom'
import McqTest from '../components/McqTest'
import McqInstructions from '../components/McqInstructions'
import { Helmet } from 'react-helmet-async'
import McqResult from '../components/McqResult'
import FooterIn from '../components/FooterIn'

function QuizPage() {
  return (
    <section className='flex flex-col justify-center items-center gap-24 mx-8 relative top-8'>
      <Helmet>
        <title>QuizSnap MCQ page</title>
      </Helmet>
        <Routes>
          <Route path='/instructions/:mcqid/:mcqlevel' element={<McqInstructions />} />
          <Route path='/testpage/:mcqid/:mcqlevel/:encName' element={<McqTest />} />
          <Route path='/resultpage' element={<McqResult />} />
        </Routes>
        <FooterIn />
      </section>
  )
}

export default QuizPage