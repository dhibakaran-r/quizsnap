import React from 'react'
import { Route, Routes } from 'react-router-dom'
import McqTest from '../components/McqTest'
import McqInstructions from '../components/McqInstructions'
import { Helmet } from 'react-helmet-async'

function QuizPage() {
  return (
    <section className='flex flex-col justify-center items-center gap-24 mx-8 relative top-8'>
      <Helmet>
        <title>QuizSnap MCQ page</title>
      </Helmet>
        <Routes>
          <Route path='/testpage' element={<McqTest />} />
          <Route path='/instructions/:mcqid' element={<McqInstructions />} />
        </Routes>
      </section>
  )
}

export default QuizPage