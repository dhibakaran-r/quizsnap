import React from 'react'
import { Route, Routes } from 'react-router-dom'
import McqTest from '../components/McqTest'
import McqInstructions from '../components/McqInstructions'

function QuizPage() {
  return (
    <section className='flex flex-col gap-24 mx-8 relative top-8'>
        <Routes>
          <Route path='/testpage' element={<McqTest />} />
          <Route path='/instructions/:mcqid' element={<McqInstructions />} />
        </Routes>
      </section>
  )
}

export default QuizPage